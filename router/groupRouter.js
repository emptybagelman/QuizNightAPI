const { Router } = require("express")
const router = Router()

const groupController = require("../controller/groupController")

router.get("/", groupController.index)
router.get("/id/:id",groupController.showId)
router.get("/name/:name",groupController.showName)
router.get("/creatorId/:id", groupController.showCreator)
router.post("/",groupController.createGroup)
router.post("/join",groupController.joinGroup)

module.exports = router;