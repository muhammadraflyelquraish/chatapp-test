const RoomMessageController = require('./room-message.controller')
const { Router } = require('express')
const router = Router()

// @ Desc   Room Initiation
router.post('/room/initiation', RoomMessageController.roomInitiation)
// @ Desc   Delete Room
router.delete('/room/:roomId', RoomMessageController.deleteRoom)
// @ Desc   Retrieve Entire Room With Recent Message
router.get('/room/message/recent', RoomMessageController.getMessageRecent)
// @ Desc   Retrieve Entire Message By Room Id
router.get('/room/:roomId/messages', RoomMessageController.getMessageByRoomId)
// @ Desc   Send Message
router.post('/room/:roomId/message/send', RoomMessageController.sendMessage)
// @ Desc   Mark Read Message
router.put('/room/:roomId/message/mark', RoomMessageController.markReadMessage)
// @ Desc   Delete Message
router.delete('/room/message/:messageId', RoomMessageController.deleteMessage)

module.exports = router
