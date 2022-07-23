const UserService = require('../users/user.service')
const jwt = require('jsonwebtoken')

module.exports.handleLogin = async (userId) => {
    const user = await UserService.getUserById(userId)

    if (!user) {
        throw new Error('User not found')
    }

    const payload = { _id: user._id, name: user.name }

    return {
        ...user._doc,
        access_token: jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }),
    }
}
