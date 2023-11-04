const db = require("../configs/db.config")
const bcrypt = require("bcrypt")
class User{

    static async createUser(user){
        const sql = "INSERT INTO user(username,password) VALUES( ? , ? )"
        await db.promise().query(sql,[user.usuario,user.password])
        const result = await User.findUsername(user.usuario)
        return result
    }
    static async findUsername(username){
        const sql = "SELECT id_usuario,username,password FROM user WHERE username=?"
        const result = await db.promise().query(sql,[username])
        return result[0][0]
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