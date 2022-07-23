const UserController = require('./user.controller')
const { Router } = require('express')
const router = Router()

// @ Desc   Retrieve Entire Users
router.get('/users', UserController.getUsers)
// @ Desc   Retrieve Specific User
router.get('/users/:userId', UserController.getUserById)
// @ Desc   Create New User
router.post('/users', UserController.createUser)
// @ Desc   Delete User
router.delete('/users/:userId', UserController.deleteUser)

module.exports = router
