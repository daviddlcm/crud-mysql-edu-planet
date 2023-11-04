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
            created_by: req.body.id_usuario,
            titulo: req.body.titulo,
            imagen: imagen.secure_url,
            contenido: req.body.contenido,
            date: new Date(),
        }
        Blog.createBlog(blog)
        return res.status(201).json({
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
const getBlogs = async (req,res)=>{
    try{
        const data =await Blog.getAll();
        console.log(data)
        return res.status(200).json({
            message:"se encontraron los datos correctamente",
            data:data
        })
    }catch(error){
        res.status(500).json({
            message:"error al obtener datos",
            error: error.message,
        })
    }
}
const deleteBlog = (req,res)=>{
    try{
        const blog={
            date: new Date(),
            id_blog: req.params.id,
            deleted_by: req.body.id_usuario,
        }
        Blog.delete(blog)
        return res.status(200).json({
            message:"se elimino correctamente el blog",
        })
    }catch(error){
        return res.status(500).json({
            message:"error al eliminar un blog",
            error:error.message
        })
    }
}
const putBlog = async(req,res)=>{
    try{
        let imagen=null
        if(req.file){
            imagen = await uploadImage(req.file.path)
            await fs.unlink(req.file.path)
        }
        const blog = {
            id_blog: req.params.id,
            update_by: req.body.id_usuario,
            titulo: req.body.titulo || null,
            imagen_url: imagen.secure_url || null,
            contenido: req.body.contenido || null,
            updated: new Date(),
        }
        Blog.put(blog)
        return res.status(200).json({
            message:"se actualizo correctamente",
            data:blog
        })
    }catch(error){
        return res.status(500).json({
            message:"error al actualizar un blog",
            error:error.message
        })
    }
}

module.exports = {
    postBlog,
    getBlogs,
    putBlog,
    deleteBlog,
}