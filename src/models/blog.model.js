const db = require("../configs/db.config");

class Blog{
    static createBlog(blog){
        const sql = "INSERT INTO blog(titulo,url_imagen,texto_contenido,created_by,created_at) VALUES (?,?,?,?,?)";
        db.query(sql,[blog.titulo,blog.imagen,blog.contenido,blog.created_by,blog.date],(error,results)=>{
            if(error){
                console.log(error)
            }else{
                console.log(results)
            }
        })
    }
    static async getAll(){
        const sql= "SELECT id_blog,titulo,url_imagen,texto_contenido,created_by,created_at,updated_at,updated_by FROM blog where deleted=false;"
        const results = await db.promise().query(sql);
        return results[0];
    }
    static put(blog){
        const sql= "UPDATE blog SET titulo = ?, url_imagen= ? ,texto_contenido= ? ,updated_at= ?, updated_by= ? WHERE id_blog = ?";
        db.query(sql,[blog.titulo,blog.imagen_url,blog.contenido,blog.updated,blog.update_by,blog.id_blog],(error,result)=>{
            if(error){
                console.log(error)
            }
            else{
                console.log(result)
            }
        })
    }
    static delete(blog){
        const sql="UPDATE blog SET deleted = true , deleted_at= ? , deleted_by= ? WHERE id_blog = ? ;";
        db.query(sql,[blog.date,blog.deleted_by,blog.id_blog],(error,result)=>{
            if(error){
                console.log(error)
            }else{
                console.log(result)
            }
        })
    }
}
module.exports = Blog;