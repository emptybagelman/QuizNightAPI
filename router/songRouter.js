const { Router } = require("express")

const songController = require("../controller/songController")

const router = Router()

router.get("/",songController.index)
router.get("/:id",songController.showId)
router.post("/",songController.create)

module.exports = router