const db = require("../configs/db.config");

class Blog {
    constructor({ id, titulo, imagen, contenido, createdAt, createdBy, updatedAt, updateBy, deleted, deletedAt, deletedBy }) {
        this.id = id;
        this.titulo = titulo;
        this.imagen = imagen;
        this.contenido = contenido;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.updatedAt = updatedAt;
        this.updatedBy = updateBy;
        this.deleted = deleted;
        this.deletedAt = deletedAt;
        this.deletedBy = deletedBy;
    }
    async save() {
        const connection = await db.createConnection()
        const [result] = await connection.execute("INSERT INTO blog(titulo,url_imagen,texto_contenido,created_by,created_at) VALUES (?,?,?,?,?)", [this.titulo, this.imagen, this.contenido, this.createdBy, this.createdAt])
        connection.end()
        if (result.insertId == 0) {
            throw new Error("No se pudo crear el blog")
        }
        this.id = result.insertId
    }

    static async getAll() {
        const connection = await db.createConnection();
        const [rows] = await connection.query("SELECT id_blog,titulo,url_imagen,texto_contenido,created_by,created_at,updated_at,updated_by FROM blog WHERE deleted = false");
        connection.end();
        return rows;
    }

    static async put(blog) {
        const connection = await db.createConnection()

        const updatedAt = new Date()

        const [result] = await connection.execute("UPDATE blog SET titulo = ?, url_imagen= ? ,texto_contenido= ? ,updated_at= ?, updated_by= ? WHERE id_blog = ?", [blog.titulo, blog.imagen, blog.contenido, updatedAt, blog.updatedBy, blog.id]);

        connection.end()

        if (result.affectedRows == 0) {
            throw new Error("No se pudo actualizar el blog")
        }

        return
    }

    static async delete(blog) {
        const connection = await db.createConnection();
        const deletedAt = new Date();
        const [result] = await connection.execute("UPDATE blog SET deleted = true, deleted_at = ?, deleted_by = ? WHERE id_blog = ?", [deletedAt, blog.deletedBy, blog.id]);

        connection.end()

        if (result.affectedRows == 0) {
            throw new Error("No se pudo eliminar el blog")
        }

        return;
    }

    static async getById(id) {
        const connection = await db.createConnection()
        const [rows] = await connection.execute("SELECT id_blog,titulo,url_imagen,texto_contenido,created_by,created_at,updated_at,updated_by FROM blog WHERE id_blog = ? AND deleted = 0", [id])
        
        connection.end()

        if(rows.length > 0){
            const row = rows[0]
            return new Blog({
                id: row.id_blog,
                titulo: row.titulo,
                imagen: row.url_imagen,
                contenido: row.texto_contenido,
                createdAt: row.created_at,
                createdBy: row.created_by,
                updatedAt: row.updated_at,
                updateBy: row.updated_by,
            })
        }
        return null
    }
    static async deleteDataTable(){
        const connection = await db.createConnection();
        const [result] = await connection.execute("DELETE FROM blog");
        
        connection.end()

        if (result.affectedRows == 0) {
            throw new Error("No se pudo eliminar el blog")
        }
        return;
    }
}
module.exports = Blog;