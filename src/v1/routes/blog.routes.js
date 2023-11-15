const express = require("express")
const router = express.Router()
const blogControllers = require("../../controllers/blogs.controller")

const verifyToken = require("../../middlewares/auth.middlewares")

router.post("/blog",verifyToken,blogControllers.postBlog)
router.get("/blog", blogControllers.getBlogs)
router.put("/blog/:id",verifyToken,blogControllers.putBlog)
router.delete("/blog/:id",verifyToken,blogControllers.deleteBlog)
router.get("/blog/:id",verifyToken, blogControllers.getByIdBlog)

module.exports = router