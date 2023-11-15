require("dotenv").config();
require("./configs/db.config")
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT;

const blogRouter = require("./v1/routes/blog.routes")
const authRouter = require("./v1/routes/auth.routes")
const multimediaRouter = require("./v1/routes/multimedia.routes")

app.use(express.json())


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./blog_imagen",
}));


app.use(express.urlencoded({extended:false}))


app.use("/api/v1", blogRouter, authRouter,multimediaRouter)

app.listen(PORT, ()=>{
    console.log("corriendo en el puerto "+PORT)
})