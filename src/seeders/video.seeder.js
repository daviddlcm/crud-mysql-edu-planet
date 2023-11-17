const Video = require("../models/video.model")

const insertMany = async ()=>{
    Video.truncateTableVideos()
    console.log("Se eliminaron los videos")
    const video1 = new Video(
        {miniatura:"link img 1",titulo:"como hablar",descripcion:"bla bla bla bla bla",link:"video de youtube",idUsuario:1,createdBy:1,idTipoVideo:1}
    )
    const video2 = new Video(
        {miniatura:"link img 2",titulo:"como exponer",descripcion:"bla bla bla bla bla",link:"video de youtube",idUsuario:1,createdBy:1,idTipoVideo:1}
    )
    const video3 = new Video(
        {miniatura:"link img 3",titulo:"como mandar mensajes",descripcion:"bla bla bla bla bla",link:"lista de youtube",idUsuario:1,createdBy:1,idTipoVideo:2}
    )
    const video4= new Video(
        {miniatura:"link img 4",titulo:"como programar",descripcion:"bla bla bla bla bla",link:"lista de youtube",idUsuario:1,createdBy:1,idTipoVideo:2}
    )
    await video1.save()
    await video2.save()
    await video3.save()
    await video4.save()
    console.log("Se crearon los videos")
}

insertMany();