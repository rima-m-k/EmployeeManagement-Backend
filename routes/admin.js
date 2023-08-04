const express = require("express"); 
const { adminLogin, adminInfo, adminCred } = require("../controller/admin/login_signup");
const { showDashboard, updateAdminImage } = require("../controller/admin/dashboard");
const upload = require("../utils/imageHandler");
const { authenticateAdmin } = require("../middlewares/authenticate");
const router = express.Router();

 
router.route('/login').post(adminLogin) 
router.route('/signup').post(adminInfo).patch(adminCred)
router.route('/dashboard').get(authenticateAdmin,showDashboard).post(authenticateAdmin,upload.single("image"),updateAdminImage)
 

module.exports = router
