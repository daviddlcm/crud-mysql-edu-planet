require("dotenv").config();
const mysql = require("mysql2/promise")

const config = {
    host:"localhost",
    user:"root",
    password:process.env.PASSWORD,
    database:"edu_planet",
}
const createConnection = async () =>{
    return await mysql.createConnection(config)
} 


module.exports = {createConnection};