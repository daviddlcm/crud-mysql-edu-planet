const cloudinary=require("cloudinary")

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
})

const uploadImage=async(filepath)=>{
    return await cloudinary.v2.uploader.upload(filepath,{
       folder:"imagen_blog"
    })
}

const deleteImage=async(publicId)=>{
    return await cloudinary.v2.uploader.destroy(publicId)
}

module.exports={
    uploadImage,
    deleteImage
}