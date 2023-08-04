const Employee = require('../../model/employeeSchema')
const bcrypt = require('bcrypt')
let employeeData = {}

async function personalInfo(req, res) {
    try {
        employeeData = req.body
        //        check email exists      
        res.json({ succes: true })
    } catch (error) {
        console.log(error)
    }
}

async function workInfo(req, res) {
    try {
        employeeData = { ...employeeData, ...req.body };
        res.json({ succes: true })
    }
    catch (error) {
        console.log(error)
    }
}

async function credentials(req, res) {
    try {
        employeeData = { ...employeeData, ...req.body };
        //check if username already exists
        //save user
        console.log((employeeData))
        const newEmployee = new Employee({
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            gender: employeeData.gender,
            email: employeeData.email,
            designation: employeeData.designation,
            department: employeeData.department,
            userName: employeeData.userName,
            password: await bcrypt.hash(employeeData.password, 10),
        })
        let emp = await newEmployee.save()
        req.session.employeeID = emp._id

        res.json({ userName: emp.userName, succes: true })


    }
    catch (error) {
        console.log(error)
    }
}

async function login(req, res) {
    try {

        const employee = await Employee.findOne({ userName: req.body.userName });
        if (employee) {
            const checkPassword = await bcrypt.compare(
                req.body.password,
                employee.password
            );
            if (checkPassword) {
                req.session.employeeID = employee._id
                res.json({
                    userName: employee.userName,
                    success: true
                });
            } else {
                res.status(401).send({ message: "Invalid  Password" });
            }
        } else {
            res.status(401).send({ message: "Invalid User Name" });
        }
    } catch (error) {

    }



}
module.exports = {
    personalInfo,
    workInfo,
    credentials,
    login
}