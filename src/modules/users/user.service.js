const UserModel = require('../../databases/models/users')

module.exports.getUsers = async () => {
    const users = await UserModel.find()
    return users
}

module.exports.getUserById = async (userId) => {
    const user = await UserModel.findOne({ _id: userId })

    if (!user) {
        throw new Error('User not found!')
    }

    return user
}

module.exports.getUserByIds = async (userIds) => {
    const user = await UserModel.find({ _id: { $in: userIds } })
    return user
}

module.exports.createUser = async (userBody) => {
    const user = await UserModel.create(userBody)
    const { accessToken, refreshToken } = user.generateToken()

    return {
        ...user._doc,
        accessToken,
        refreshToken,
    }
}

module.exports.deleteUser = async (userId) => {
    const user = await UserModel.deleteOne({ _id: userId })

    if (!user?.deletedCount) {
        throw new Error('User not found!')
    }

    return user
}
