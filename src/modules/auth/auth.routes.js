const AuthController = require('./auth.controller')
const { Router } = require('express')
const router = Router()

// @ Desc   Login Handle
router.post('/oauth/login', AuthController.handleLogin)
// @ Desc   Refresh Token
router.post('/oauth/refresh', AuthController.refreshToken)

module.exports = router
