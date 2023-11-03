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
router.get("/blog", blogControllers.getBlog)
router.put("/blog/:id",upload.single("imagen"),blogControllers.putBlog)
router.delete("/blog/:id",blogControllers.deleteBlog)

module.exports = router