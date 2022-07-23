const UserRoutes = require('./modules/users/user.routes')
const AuthRoutes = require('./modules/auth/auth.routes')
const RoomMessageRoutes = require('./modules/room-message/room-message.routes')
const AuthGuard = require('./guards/AuthGuard')
const { Router } = require('express')
const router = Router()

// @ Root
router.get('/', (req, res) => res.send('API running'))
// @ User Module
router.use(UserRoutes)
// @ Auth Module
router.use(AuthRoutes)
// @ RoomMessage Module With Auth Middleware
router.use(AuthGuard, RoomMessageRoutes)
// @ Error Handler
router.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist',
    })
})

module.exports = router
