const express = require('express');
const router = express.Router()

const videoController = require("../../controllers/video.controller")
const verifyToken = require("../../middlewares/auth.middlewares")

router.get("/videos/:id", videoController.getVideos)
router.post("/video",verifyToken, videoController.createVideo)
router.delete("/video/:id",verifyToken, videoController.deleteVideo)
router.put("/video/:id",verifyToken, videoController.putVideo)
router.get("/video/:id", videoController.getById)

module.exports = router