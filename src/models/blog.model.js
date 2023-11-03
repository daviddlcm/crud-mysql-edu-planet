const db = require("../configs/db.config");

class Blog{
    static createBlog(blog){
        const sql = "INSERT INTO blog(id_usuario,titulo,url_imagen,texto_contenido) VALUES (?,?,?,?)";
        db.query(sql,[blog.id_usuario,blog.titulo,blog.imagen,blog.contenido],(error,results)=>{
            if(error){
                console.log(error)
            }else{
                console.log(results)
            }
        })
    }
    static async getAll(){
        const sql= "SELECT id_blog,id_usuario,titulo,url_imagen,texto_contenido,updated_at,deleted,deleted_at FROM blog where deleted=false;"
        const results = await db.promise().query(sql);
        return results[0];
    }
    static put(blog){
        const sql= "UPDATE blog SET titulo = ?, url_imagen= ? ,texto_contenido= ? ,updated_at= ? WHERE id_blog = ? && id_usuario = ?;";
        db.query(sql,[blog.titulo,blog.imagen_url,blog.contenido,blog.updated,blog.id_blog,blog.id_usuario],(error,result)=>{
            if(error){
                console.log(error)
            }
            else{
                console.log(result)
            }
        })
    }
    static delete(blog){
        const sql="UPDATE blog SET deleted=?, deleted_at=? WHERE id_blog = ? && id_usuario= ?";
        db.query(sql,[blog.delete,blog.date,blog.id_blog,blog.id_usuario],(error,result)=>{
            if(error){
                console.log(error)
            }else{
                console.log(result)
            }
        })
    }
}
module.exports = Blog;