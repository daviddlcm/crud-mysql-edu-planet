const express = require("express")
const router = express.Router()
const blogControllers = require("../../controllers/blog.controller")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/blog_imagen');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload= multer({storage});

router.post("/blog",upload.single("imagen"),blogControllers.postBlog)
    
module.exports = router