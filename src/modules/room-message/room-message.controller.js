const RoomMessageService = require('./room-message.service')

module.exports.roomInitiation = async (req, res) => {
    try {
        const { userIds } = req.body
        const chatInitiator = req.user._id
        const initiation = await RoomMessageService.roomInitiation(
            userIds,
            chatInitiator
        )
        res.success(initiation)
    } catch (error) {
        res.badreq(error?.message)
    }
}

module.exports.deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params
        const room = await RoomMessageService.deleteRoom(roomId)
        res.success(null, `Deleted count: ${room.deletedCount}`)
    } catch (error) {
        res.badreq(error?.message)
    }
}

module.exports.getMessageRecent = async (req, res) => {
    try {
        const userId = req.user._id
        const options = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 10,
        }
        const recentMessage = await RoomMessageService.getMessageRecent(
            userId,
            options
        )
        res.success(recentMessage)
    } catch (error) {
        res.badreq(error?.message)
    }
}

module.exports.getMessageByRoomId = async (req, res) => {
    try {
        const { roomId } = req.params
        const userId = req.user._id
        const options = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 10,
        }
        const roomMessages = await RoomMessageService.getMessageByRoomId(
            roomId,
            userId,
            options
        )
        res.success(roomMessages)
    } catch (error) {
        res.badreq(error?.message)
    }
}

module.exports.sendMessage = async (req, res) => {
    try {
        const roomId = req.params.roomId
        const { message } = req.body
        const userId = req.user._id
        const sendedMessage = await RoomMessageService.sendMessage(
            roomId,
            userId,
            message
        )
        res.success(sendedMessage)
    } catch (error) {
        res.badreq(error?.message)
    }
}

module.exports.markReadMessage = async (req, res) => {
    try {
        const roomId = req.params.roomId
        const userId = req.user._id
        const markedMessage = await RoomMessageService.markReadMessage(
            roomId,
            userId
        )
        res.success(
            null,
            `Marked message count: ${markedMessage?.modifiedCount}`
        )
    } catch (error) {
        res.badreq(error?.message)
    }
}

module.exports.deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params
        const message = await RoomMessageService.deleteMessage(messageId)
        res.success(null, `Deleted count: ${message.deletedCount}`)
    } catch (error) {
        res.badreq(error?.message)
    }
}
