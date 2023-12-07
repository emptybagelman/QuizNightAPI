const { Router } =  require('express')

const userController = require('../controller/userController')

const userRoutes = Router()

userRoutes.get('/', userController.index)
userRoutes.get('/tokens', userController.indexToken)
userRoutes.post('/register', userController.register)
userRoutes.post('/login', userController.login)
userRoutes.delete('/tokens/:user_id', userController.destroy)
userRoutes.get('/tokens/:user_id', userController.show)

module.exports = userRoutes;
