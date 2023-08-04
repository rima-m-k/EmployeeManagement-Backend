function authenticateAdmin(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    const userName = req.headers.authorization.split("\"")[1];
    req.Admin = userName
    next()
  }
}

function authenticateEmployee(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    const userName = req.headers.authorization.split("\"")[1];
    req.Employee = userName
    next()
  }
}
module.exports = {
  authenticateAdmin,authenticateEmployee
}