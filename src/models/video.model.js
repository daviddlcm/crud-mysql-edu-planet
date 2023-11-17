const db = require("../configs/db.config")
class Video{
    constructor({id,miniatura,titulo,descripcion,link,idUsuario,createdBy,createdAt,deleted,deletedBy,deletedAt,updatedAt,updatedBy,idTipoVideo}){
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
        this.idTipoVideo = idTipoVideo
    }
    static async getAll(id){
        const connection = await db.createConnection();
        const [rows] = await connection.query("SELECT id_video,miniatura,titulo,descripcion,link,id_usuario,created_by,created_at,deleted,deleted_by,deleted_at,updated_at,updated_by,id_tipo_video FROM video WHERE deleted = false AND id_tipo_video = ? ",[id]);

        connection.end();
        return rows;
    }
    async save(){
        const connection = await db.createConnection()

        const createdAt = new Date()
        const [result] = await connection.execute("INSERT INTO video(miniatura,titulo,descripcion,link,id_usuario,created_by,created_at,id_tipo_video) VALUES (?,?,?,?,?,?,?,?)", [this.miniatura,this.titulo,this.descripcion,this.link,this.idUsuario,this.createdBy,createdAt,this.idTipoVideo])

        connection.end()

        if(result.insertId == 0){
            throw new Error("No se pudo crear el multimedia")
        }
        this.id = result.insertId
    }
    static async deleteVideo(multimedia){
        const connection = await db.createConnection()

        const deletedAt = new Date()

        const [result] = await connection.execute("UPDATE video SET deleted = 1, deleted_by = ?, deleted_at = ?  WHERE id_video = ? ",[multimedia.idUsuario,deletedAt,multimedia.id])

        connection.end()

        if(result.affectedRows == 0){
            throw new Error("No se pudo eliminar el multimedia")
        }

        return;
    }

    static async putVideo(multimedia){
        const connection = await db.createConnection()

        const updatedAt = new Date()

        const [result] = await connection.execute("UPDATE video SET miniatura = ?, titulo = ?, descripcion = ?, link = ?, updated_by = ?, updated_at = ?  WHERE id_video = ? ",[multimedia.miniatura,multimedia.titulo,multimedia.descripcion,multimedia.link,multimedia.idUsuario,updatedAt,multimedia.id])
        
        connection.end()

        if(result.affectedRows == 0){
            throw new Error("No se pudo actualizar el multimedia")
        }
        return 
    }
    static async getById(id){
        const connection = await db.createConnection()
        const [rows] = await connection.execute("SELECT id_video,miniatura,titulo,descripcion,link,id_usuario,created_by,created_at,deleted,deleted_by,deleted_at,updated_at,updated_by,id_tipo_video FROM video WHERE id_video = ? AND deleted = false",[id])

        connection.end()

        if(rows.length > 0){
            const row = rows[0]
            return new Video({
                id: row.id_video,
                miniatura: row.miniatura,
                titulo: row.titulo,
                descripcion: row.descripcion,
                link: row.link,
                idUsuario: row.id_usuario,
                createdBy: row.created_by,
                createdAt: row.created_at,
                deleted: row.deleted,
                deletedBy: row.deleted_by,
                deletedAt: row.deleted_at,
                updatedAt: row.updated_at,
                updatedBy: row.updated_by,
                idTipoVideo: row.id_tipo_video
            })
        }
        return null   
    }
    static async truncateTable(){
        const connection = await db.createConnection()
        const [result] = await connection.execute("DELETE FROM tipo_video")
        connection.end()
        if(result.affectedRows == 0){
            throw new Error("No se pudo eliminar los datos de la tabla")
        }
        return
    }
    static async truncateTableVideos(){
        const connection = await db.createConnection()
        const [result] = await connection.execute("DELETE FROM video")
        connection.end()
        if(result.affectedRows == 0){
            throw new Error("No se pudo eliminar los datos de la tabla")
        }
        return
    }
    static async create({id_tipo_video,tipo}){
        const connection = await db.createConnection()
        const [result] = await connection.execute("INSERT INTO tipo_video(id_tipo_video,tipo) VALUES (?,?)",[id_tipo_video,tipo])

        connection.end()

        if(result.affectedRows == 0){
            throw new Error("No se pudo crear el tipo de video")
        }
    }
}
module.exports = Video