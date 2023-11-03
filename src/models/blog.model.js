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
    static getAll(){
        
    }
}
module.exports = Blog;