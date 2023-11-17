require("dotenv").config()
const Video = require("../models/video.model")
const fs=require("fs-extra")
const { uploadImage } = require("../configs/cloudinary.config")
const jwt = require("jsonwebtoken")


const getVideos = async (req,res)=>{
    try{
        const multimedias = await Video.getAll()
        return res.status(200).json({
            message:"Se obtuvieron los multimedias",
            data: multimedias
        })
    }catch(error){
        return res.status(500).json({
            message:"error al obtener los multimedias",
            error: error.message,
        })
    }
}

const createVideo = async (req,res)=>{
    try{
        const token = jwt.verify(req.headers.token,process.env.SECRET)
        let imagen=null
        if(req.files?.imagen){
            imagen=await uploadImage(req.files.imagen.tempFilePath)
            await fs.unlink(req.files.imagen.tempFilePath)
        } 
        const multimedia = new Video({
            miniatura: imagen.secure_url,
            titulo:req.body.titulo,
            descripcion:req.body.descripcion,
            link:req.body.link,
            idUsuario: token.id,
            createdBy: token.id,
        })
        await multimedia.save()
        return res.status(200).json({
            message:"Se creo el multimedia",
            data: multimedia
        })
    }catch(error){
        return res.status(500).json({
            message:"error al crear el multimedia",
            error: error.message,
        })
    }
}

const deleteVideo = async (req,res)=>{
    try{
        const token = jwt.verify(req.headers.token,process.env.SECRET)
        const multimedia = {
            id: req.params.id,
            idUsuario: token.id,
        }
        await Video.deleteVideo(multimedia)

        return res.status(200).json({
            message:"Se elimino el multimedia",
        })
    }catch(error){
        return res.status(500).json({
            message:"error al eliminar el multimedia",
            error: error.message,
        })
    }
}

const putVideo = async (req,res)=>{
    try{
        const token = jwt.verify(req.headers.token,process.env.SECRET)
        let imagen=null
        if(req.files?.imagen){
            imagen=await uploadImage(req.files.imagen.tempFilePath)
            await fs.unlink(req.files.imagen.tempFilePath)
        } 
        const multimedia = {
            id: req.params.id,
            idUsuario: token.id,
            miniatura: imagen.secure_url,
            titulo:req.body.titulo,
            descripcion:req.body.descripcion,
            link:req.body.link,
        }
        await Video.putVideo(multimedia)
        return res.status(200).json({
            message:"Se actualizo la multimedia",
        })
    }catch(error){
        return res.status(500).json({
            message:"error al actualizar el multimedia",
            error: error.message,
        })
    }
}
module.exports = {
    getVideos,
    createVideo,
    deleteVideo,
    putVideo,
}