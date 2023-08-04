const express = require("express"); 
const { personalInfo, workInfo,credentials, login } = require("../controller/employee/login_signup");
const { EmployeeData, updateEmpImage } = require("../controller/employee/dashboard");
const upload = require("../utils/imageHandler");
const { authenticateEmployee } = require("../middlewares/authenticate");
const router = express.Router();

router.route('/signup').post(personalInfo).patch(workInfo).put(credentials)
router.route('/dashboard').get(authenticateEmployee,EmployeeData).post(authenticateEmployee,upload.single("image"),updateEmpImage)

router.route('/').post(login)

module.exports = router