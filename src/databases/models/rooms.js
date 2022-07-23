const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const RoomSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ''),
        },
        userIds: Array,
        chatInitiator: String,
    },
    {
        timestamps: true,
        collection: 'rooms',
    }
)

RoomSchema.statics.aggregateRecentMessage = async function (roomIds, options) {
    return await this.aggregate([
        { $match: { _id: { $in: roomIds } } },
        { $sort: { createdAt: -1 } },
        {
            $lookup: {
                from: 'messages',
                localField: '_id',
                foreignField: 'roomId',
                as: 'recentMessage',
            },
        },
        { $unwind: '$recentMessage' },
        { $unwind: '$recentMessage.userId' },
        {
            $lookup: {
                from: 'users',
                localField: 'userIds',
                foreignField: '_id',
                as: 'roomInfo.userProfile',
            },
        },
        { $unwind: '$roomInfo.userProfile' },
        {
            $lookup: {
                from: 'users',
                localField: 'recentMessage.userId',
                foreignField: '_id',
                as: 'postedByUser',
            },
        },
        { $unwind: '$postedByUser' },
        {
            $group: {
                _id: '$_id',
                recentMessage: { $last: '$recentMessage' },
                postedBy: { $last: '$postedByUser' },
                roomInfo: { $addToSet: '$roomInfo.userProfile' },
                createdAt: { $last: '$createdAt' },
            },
        },
        { $skip: options.page * options.limit },
        { $limit: options.limit },
    ])
}

module.exports = mongoose.model('Room', RoomSchema)
