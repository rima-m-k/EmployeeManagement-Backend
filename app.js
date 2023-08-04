const express = require('express')
const dotenv = require("dotenv");
const dbconnect = require("./config/dbConnect");
const corsMiddleware = require('./middlewares/cors');
const session = require("express-session");

dotenv.config();
const PORT = process.env.PORT || 8080;

dbconnect.dbconnect();
const employees = require("./routes/employees");
const admin = require("./routes/admin");

const app = express()
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(
	session({
	  secret: "its a secret",
	  resave: false,
	  saveUninitialized: true,
	  maxAge: 60000
	})
  );
  
app.use("/", employees);
app.use("/admin", admin);

app.listen(PORT, (error) =>{
	if(!error)
		console.log("listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);