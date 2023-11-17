const Video = require("../models/video.model")

const insertMany = async ()=>{
    Video.truncateTable()
    console.log("Se eliminaron los tipos de video")
    await Video.create({id_tipo_video:1, tipo:"Video"})
    await Video.create({id_tipo_video:2, tipo:"Lista"})

    console.log("Se crearon los tipos de video")
}

insertMany()