const Blog = require("../models/blog.model")
const fs=require("fs-extra")
const { uploadImage } = require("../configs/cloudinary.config")

const postBlog = async (req,res)=>{
    try {
        console.log(req.file.path)
        let imagen=null
        if(req.file){
            imagen = await uploadImage(req.file.path)
            await fs.unlink(req.file.path)
        }
        const blog = {
            id_usuario: req.body.id_usuario,
            titulo: req.body.titulo,
            imagen: imagen.secure_url,
            contenido: req.body.contenido,
        }
        Blog.createBlog(blog)
        return res.status(200).json({
            message: "se creo el blog correctamente",
            data:blog,
        })
    } catch (error) {
        return res.status(500).json({
            message: "error al crear un blog",
            error: error.message
        })
    }
}
const getBlog = async (req,res)=>{
    try{
        
    }catch(error){
        res.status(404).json({
            message:"error al obtener datos",
            error: error.message,
        })
    }
}
module.exports = {
    postBlog
}