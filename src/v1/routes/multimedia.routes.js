const express = require('express');
const router = express.Router()

const multimediaController = require("../../controllers/multimedia.controller")
const verifyToken = require("../../middlewares/auth.middlewares")

router.get("/multimedias", multimediaController.getMultimedias)
router.post("/multimedia",verifyToken, multimediaController.createMultimedia)
router.delete("/multimedia/:id",verifyToken, multimediaController.deleteMultimedia)
router.put("/multimedia/:id",verifyToken, multimediaController.putMultimedia)

module.exports = router