const express = require('express');
const router = express.Router()

const multimediaController = require("../../controllers/multimedia.controller")
const verifyToken = require("../../middlewares/auth.middlewares")

router.get("/videos", multimediaController.getVideos)
router.post("/video",verifyToken, multimediaController.createVideo)
router.delete("/video/:id",verifyToken, multimediaController.deleteVideo)
router.put("/video/:id",verifyToken, multimediaController.putVideo)

module.exports = router