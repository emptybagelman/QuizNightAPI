const { Router } = require("express")
const router = Router()

const questionController = require("../controller/questionController")

router.get("/",questionController.index)
router.get("/:id",questionController.showId)
router.get("/quiz/:quiz_id",questionController.showQuizId)
router.get("/category/:category",questionController.showCategory)
router.post("/",questionController.create)
router.patch("/:id",questionController.update)
router.delete("/:id",questionController.destroy)

module.exports = router;