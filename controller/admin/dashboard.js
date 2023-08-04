const Employee = require('../../model/employeeSchema')
const Admin = require('../../model/adminSchema')



async function showDashboard(req, res) {
    try {
        // console.log(req.query)
        let adminData = await Admin.findOne({ userName: req.query.user.slice(1, -1) })
        let allEmployees = await Employee.find()
        let allAdmins = await Admin.find()
        console.log(allEmployees)
        res.json({ adminData: adminData, allEmployees: allEmployees, allAdmins: allAdmins })
    } catch (error) {
        console.log(error)
    }


}

async function updateAdminImage(req, res) {
    try {
        console.log(req.file)
        // file checking
        let x = await Admin.updateOne({ userName: req.Admin }, {
            $set: {
                image: req.file.filename
            }
        })
        console.log(x)

    } catch (error) {

    }
}


module.exports = {
    showDashboard,
    updateAdminImage
}