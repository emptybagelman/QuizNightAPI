const { Router } = require("express")

const memberController = require("../controller/memberController")

const router = Router()

router.get("/",memberController.index)
router.get("/:id",memberController.showId)
router.get("/group/:group_id",memberController.showGroupId)
router.post("/",memberController.create)
router.patch("/nickname/:id",memberController.updateNickname)
router.patch("/totalscore/:id",memberController.updateTotalScore)
router.delete("/:id",memberController.destroy)

module.exports = router