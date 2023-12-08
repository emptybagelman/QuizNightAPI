const { Router } = require("express")
const router = Router()

const paController = require("../controller/playeranswerController")

router.get("/",paController.index)
router.get("/:id",paController.showId)
router.get("/users/:user_id",paController.showAllUsers)
router.get("/question/:question_id",paController.showAllQuestions)
router.post("/",paController.create)

module.exports = router