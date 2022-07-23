const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const __RecipientSchema = new mongoose.Schema(
    {
        _id: false,
        userId: String,
        readAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: false,
    }
)

const MESSAGE_TYPES = {
    TEXT: 'text',
}

const MessageSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ''),
        },
        roomId: String,
        userId: String,
        message: mongoose.Schema.Types.Mixed,
        type: {
            type: String,
            default: () => MESSAGE_TYPES.TEXT,
        },
        recipients: [__RecipientSchema],
    },
    {
        timestamps: true,
        collection: 'messages',
    }
)

MessageSchema.statics.aggregateSendMessage = async function (messageId) {
    const message = await this.aggregate([
        { $match: { _id: messageId } },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'postedByUser',
            },
        },
        { $unwind: '$postedByUser' },
        {
            $lookup: {
                from: 'rooms',
                localField: 'roomId',
                foreignField: '_id',
                as: 'chatRoomInfo',
            },
        },
        { $unwind: '$chatRoomInfo' },
        { $unwind: '$chatRoomInfo.userIds' },
        {
            $lookup: {
                from: 'users',
                localField: 'chatRoomInfo.userIds',
                foreignField: '_id',
                as: 'chatRoomInfo.userProfile',
            },
        },
        { $unwind: '$chatRoomInfo.userProfile' },
        {
            $group: {
                _id: '$_id',
                roomId: { $last: '$roomId' },
                message: { $last: '$message' },
                type: { $last: '$type' },
                postedBy: { $last: '$postedByUser' },
                roomInfo: { $addToSet: '$chatRoomInfo.userProfile' },
                createdAt: { $last: '$createdAt' },
                updatedAt: { $last: '$updatedAt' },
            },
        },
    ])

    return message[0]
}

MessageSchema.statics.aggregateMessageByRoomId = async function (
    roomId,
    options
) {
    return await this.aggregate([
        { $match: { roomId } },
        { $sort: { createdAt: -1 } },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'postedByUser',
            },
        },
        { $unwind: '$postedByUser' },
        {
            $group: {
                _id: '$_id',
                roomId: { $last: '$roomId' },
                message: { $last: '$message' },
                type: { $last: '$type' },
                postedBy: { $last: '$postedByUser' },
                recipients: { $last: '$recipients' },
                createdAt: { $last: '$createdAt' },
            },
        },
        { $skip: options.page * options.limit },
        { $limit: options.limit },
        { $sort: { createdAt: 1 } },
    ])
}

module.exports = mongoose.model('RoomMessage', MessageSchema)
