require("dotenv").config();
const mysql = require("mysql2")

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.PASSWORD,
    database:"edu_planet",
})
module.exports = db;