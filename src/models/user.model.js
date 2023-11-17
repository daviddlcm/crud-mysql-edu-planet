const db = require("../configs/db.config")
const bcrypt = require("bcrypt")
class User{

    static async createUser(user){
        const connection = await db.createConnection()
        const [results] = await connection.query("INSERT INTO user(username,password) VALUES( ? , ? )",[user.usuario,user.password])
        const result = await User.findUsername(user.usuario)

        connection.end()
        
        return result
    }
    static async findUsername(username){
        const connection = await db.createConnection()
        const [[rows]] = await connection.query("SELECT id_usuario,username,password FROM user WHERE username=?",[username])

        connection.end()

        return rows
    }
    static async encryptPassword(password){
        const salt = await bcrypt.genSalt(process.env.SALT)
        return await bcrypt.hash(password,salt)
    }
    static async comparePassword(password,receivedPassword){
        return await bcrypt.compare(password,receivedPassword)
    }
}
module.exports = User