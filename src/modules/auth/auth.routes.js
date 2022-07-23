const AuthController = require('./auth.controller')
const { Router } = require('express')
const router = Router()

// @ Desc   Login Handle
router.post('/auth/:userId', AuthController.handleLogin)

module.exports = router
