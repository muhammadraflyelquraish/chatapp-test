const RoomModel = require('../../databases/models/rooms')
const MessageModel = require('../../databases/models/messages')

module.exports.roomInitiation = async (userIds, chatInitiator) => {
    let isNew = false
    let chatRoom = await RoomModel.findOne({
        userIds: {
            $size: userIds.length,
            $all: [...userIds],
        },
    })

    if (!chatRoom) {
        isNew = true
        chatRoom = await RoomModel.create({ userIds, chatInitiator })
    }

    return { isNew, chatRoom }
}

module.exports.deleteRoom = async (roomId) => {
    const deletedRoom = await RoomModel.deleteOne({ _id: roomId })

    if (!deletedRoom?.deletedCount) {
        throw new Error('Room not found!')
    }

    return deletedRoom
}

module.exports.getMessageRecent = async (userId, options) => {
    const rooms = await RoomModel.find({ userIds: { $all: [userId] } })
    const roomIds = [...new Set(rooms.map((room) => room._id))]

    return await RoomModel.aggregateRecentMessage(roomIds, options)
}

module.exports.getMessageByRoomId = async (roomId, userId, options) => {
    const chatRoom = await RoomModel.findOne({ _id: roomId, userIds: userId })

    if (!chatRoom) {
        throw new Error('Room not found!')
    }

    return await MessageModel.aggregateMessageByRoomId(roomId, options)
}

module.exports.sendMessage = async (roomId, userId, message) => {
    const chatRoom = await RoomModel.findOne({ _id: roomId, userIds: userId })

    if (!chatRoom) {
        throw new Error('Room not found!')
    }

    const sendedMessage = await MessageModel.create({
        roomId: chatRoom._id,
        userId: userId,
        message: {
            text: message,
        },
        recipients: { userId: userId },
    })

    return MessageModel.aggregateSendMessage(sendedMessage._id)
}

module.exports.markReadMessage = async (roomId, userId) => {
    const chatRoom = await RoomModel.findOne({ _id: roomId, userIds: userId })

    if (!chatRoom) {
        throw new Error('Room not found!')
    }

    const markedMessages = await MessageModel.updateMany(
        {
            roomId: roomId,
            'recipients.userId': { $ne: userId },
        },
        {
            $addToSet: {
                recipients: { userId: userId },
            },
        },
        {
            multi: true,
        }
    )

    return markedMessages
}

module.exports.deleteMessage = async (messageId) => {
    const message = await MessageModel.deleteOne({ _id: messageId })

    if (!message?.deletedCount) {
        throw new Error('Message not found!')
    }

    return message
}
