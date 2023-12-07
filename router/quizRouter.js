const { Router } = require("express")

const quizController = require("../controller/quizController")

const quizRoutes = Router()

quizRoutes.get("/",quizController.index)
quizRoutes.get("/:id",quizController.showId)
quizRoutes.get("/group/:group_id",quizController.showGroupId)
quizRoutes.get("/creator/:creator_id",quizController.showCreatorId)
quizRoutes.post("/",quizController.createQuiz)
quizRoutes.patch("/:id",quizController.update)
quizRoutes.delete("/:id",quizController.destroy)

module.exports = quizRoutes