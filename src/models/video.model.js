const db = require("../configs/db.config")
class Video{
    constructor({id,miniatura,titulo,descripcion,link,idUsuario,createdBy,createdAt,deleted,deletedBy,deletedAt,updatedAt,updatedBy}){
        this.id = id
        this.miniatura = miniatura
        this.titulo = titulo
        this.descripcion = descripcion
        this.link = link
        this.idUsuario = idUsuario
        this.createdBy = createdBy
        this.createdAt = createdAt
        this.deleted = deleted
        this.deletedBy = deletedBy
        this.deletedAt = deletedAt
        this.updatedAt = updatedAt
        this.updatedBy = updatedBy
    }
    static async getAll(){
        const connection = await db.createConnection();
        const [rows] = await connection.query("SELECT id_video,miniatura,titulo,descripcion,link,id_usuario,created_by,created_at,deleted,deleted_by,deleted_at,updated_at,updated_by FROM multimedia WHERE deleted = false");

        connection.end();
        return rows;
    }
    async save(){
        const connection = await db.createConnection()

        const createdAt = new Date()
        const [result] = await connection.execute("INSERT INTO multimedia(miniatura,titulo,descripcion,link,id_usuario,created_by,created_at) VALUES (?,?,?,?,?,?,?)", [this.miniatura,this.titulo,this.descripcion,this.link,this.idUsuario,this.createdBy,createdAt])

        connection.end()

        if(result.insertId == 0){
            throw new Error("No se pudo crear el multimedia")
        }
        this.id = result.insertId
    }
    static async deleteVideo(multimedia){
        const connection = await db.createConnection()

        const deletedAt = new Date()

        const [result] = await connection.execute("UPDATE multimedia SET deleted = 1, deleted_by = ?, deleted_at = ?  WHERE id_video = ? ",[multimedia.idUsuario,deletedAt,multimedia.id])

        connection.end()

        if(result.affectedRows == 0){
            throw new Error("No se pudo eliminar el multimedia")
        }

        return;
    }

    static async putVideo(multimedia){
        const connection = await db.createConnection()

        const updatedAt = new Date()

        const [result] = await connection.execute("UPDATE multimedia SET miniatura = ?, titulo = ?, descripcion = ?, link = ?, updated_by = ?, updated_at = ?  WHERE id_video = ? ",[multimedia.miniatura,multimedia.titulo,multimedia.descripcion,multimedia.link,multimedia.idUsuario,updatedAt,multimedia.id])
        
        connection.end()

        if(result.affectedRows == 0){
            throw new Error("No se pudo actualizar el multimedia")
        }
        return 
    }
}
module.exports = Video