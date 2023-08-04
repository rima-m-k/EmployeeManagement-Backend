const Employee = require('../../model/employeeSchema')
const Admin = require('../../model/adminSchema')

const bcrypt = require('bcrypt')
let adminData = {}
async function adminLogin(req, res) {
    try {

        const admin = await Admin.findOne({ userName: req.body.userName });
        if (admin) {
            const checkPassword = await bcrypt.compare(
                req.body.password,
                admin.password
            );
            if (checkPassword) {
                req.session.adminID = admin._id
                // update last login time
                await Admin.updateOne({ userName: req.body.userName },
                    {
                        $set: {
                            lastLogin: Date.now()
                        }
                    })
                res.json({
                    userName: admin.userName,
                    success: true
                });
            } else {
                res.status(401).send({ message: "Invalid  Password" });
            }
        } else {
            res.status(400).send({ message: "Invalid User Name" });
        }
    } catch (error) {

    }



}
async function adminInfo(req, res) {
    try {
        if (req.body.firstName.trim() !== '' && req.body.lastName.trim() !== '' && req.body.gender.trim() !== '' && req.body.email.trim() !== '') {
            adminData = req.body
            // check if email exists  
            let checkAdmin = await Admin.findOne({ email: req.body.email })
            if (checkAdmin) {
                res.status(400).json({ error: 'Email already taken' });
            } else {
                res.json({ success: true })
            }
        } else {
            res.status(400).json({ error: 'Form cannot contain empty fields' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });

    }
}
async function adminCred(req, res) {
    try {
        adminData = { ...adminData, ...req.body };
        //check if username already exists
        let checkEmpUserName = await Employee.findOne({ userName: req.body.userName })
        let checkAdmUserName = await Admin.findOne({ userName: req.body.userName })
        if (checkAdmUserName || checkEmpUserName) res.status(400).json({ error: 'Username already taken' });
        //save user
        console.log((adminData))
        const newAdmin = new Admin({
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            gender: adminData.gender,
            userName: adminData.userName,
            email: adminData.email,
            password: await bcrypt.hash(adminData.password, 10),

        })
        let adm = await newAdmin.save()
        req.session.adminID = adm._id
        adminData = {}
        res.json({ userName: adm.userName, succes: true })


    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });

    }
}



module.exports = {
    adminLogin,
    adminInfo,
    adminCred,
}