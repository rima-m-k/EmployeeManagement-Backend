const Employee = require('../../model/employeeSchema')
const Admin = require('../../model/adminSchema')



async function EmployeeData(req,res){
console.log(req.query.user)
let data= await Employee.findOne({userName:req.query.user.slice(1, -1)})
console.log(data)
res.json(data)
}

async function updateEmpImage(req,res){
    try {
        console.log(req.file)
        // file checking
       let x=await Employee.updateOne({userName:req.Employee},{
            $set:{
                image:req.file.filename
            }
        })
        console.log(x)
        
    } catch (error) {
        
    }
}

module.exports={
    EmployeeData,
    updateEmpImage
}