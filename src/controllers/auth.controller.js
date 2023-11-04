const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const signUp = async(req,res) =>{
    const result = await User.findUsername(req.body.usuario)
    if(result){
        return res.status(200).json({
            message:"usuario ya agregado"
        })
    
    }
    const user = {
        usuario: req.body.usuario,
        password: await User.encryptPassword(req.body.password),
    }
    const usuarioCreated = await User.createUser(user)
    const token = jwt.sign({id:usuarioCreated.id_usuario},process.env.SECRET,{
        expiresIn: 86400 // son 24 horas
    })

    return res.status(200).json({
        message:"sign up",
        token:token
    })
}
const signIn = async(req,res)=>{
    const usuarioFound = await User.findUsername(req.body.usuario)
    if(!usuarioFound){
        return res.status(404).json({
            message:"usuario o password incorrectos"
        })
    }
    const matchPassword = await User.comparePassword(req.body.password,usuarioFound.password)
    if(!matchPassword){
        return res.status(404).json({
            message:"usuario o password incorrectos"
        })
    }
    const token = jwt.sign({id:usuarioFound.id_usuario},process.env.SECRET    ,{
        expiresIn: 86400
    })
    return res.status(200).json({
        message:"sign in",
        token: token,
    })
}
module.exports = {
    signIn,
    signUp,
}
