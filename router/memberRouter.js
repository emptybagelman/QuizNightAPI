const { Router } = require("express")

const memberController = require("../controller/memberController")

const memberRoutes = Router()

memberRoutes.get("/",memberController.index)
memberRoutes.get("/:id",memberController.showId)
memberRoutes.get("/group/:group_id",memberController.showGroupId)
memberRoutes.post("/",memberController.create)
memberRoutes.patch("/nickname/:id",memberController.updateNickname)
memberRoutes.patch("/totalscore/:id",memberController.updateTotalScore)
memberRoutes.delete("/:id",memberController.destroy)

module.exports = memberRoutes