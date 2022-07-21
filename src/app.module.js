const UserRoutes = require('./modules/users/user.routes')
const { Router } = require('express')
const router = Router()

// @ Root
router.get('/', (req, res) => console.log('Hello World'))

// @ User Module
router.use(UserRoutes)

module.exports = router
