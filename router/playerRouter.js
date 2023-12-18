const { Router } = require("express")
const router = Router()

const playerController = require("../controller/playerController")

router.get("/",playerController.index)
router.get("/:id",playerController.showId)
router.get("/quiz/:quiz_id",playerController.showQuizId)
router.get("/quiz/usernames/:quiz_id",playerController.showUsernamesOfQuiz)
router.post("/",playerController.create)
router.patch("/localscore/:id",playerController.updateLocalScore)
router.delete("/:id",playerController.destroy)

module.exports = router