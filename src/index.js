require("dotenv").config();
require("./configs/db.config")
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT;

const blogRouter = require("./v1/routes/blog.routes")

app.use(express.json())
app.use("/api/v1", blogRouter)
app.use(express.urlencoded({extended:false}))


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./blog_imagen",
  }));

app.listen(PORT, ()=>{
    console.log("corriendo en el puerto "+PORT)
})