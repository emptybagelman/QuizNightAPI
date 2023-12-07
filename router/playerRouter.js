const { Router } = require("express")
const router = Router()

const playerController = require("../controller/playerController")

router.get("/",playerController.index)
router.get("/:id",playerController.showId)
router.get("/quiz/:id",playerController.showQuizId)
router.post("/",playerController.create)
router.delete("/:id",playerController.destroy)