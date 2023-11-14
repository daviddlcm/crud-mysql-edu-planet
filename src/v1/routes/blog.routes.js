const express = require("express")
const router = express.Router()
const blogControllers = require("../../controllers/blogs.controller")
const multer = require("multer")

const verifyToken = require("../../middlewares/auth.middlewares")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/blog_imagen');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload= multer({storage});

router.post("/blog",verifyToken,upload.single("imagen"),blogControllers.postBlog)
router.get("/blog", blogControllers.getBlogs)
router.put("/blog/:id",verifyToken,upload.single("imagen"),blogControllers.putBlog)
router.delete("/blog/:id",verifyToken,blogControllers.deleteBlog)
router.get("/blog/:id",verifyToken, blogControllers.getByIdBlog)

module.exports = router