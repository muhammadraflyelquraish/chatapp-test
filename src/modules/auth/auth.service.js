const UserService = require('../users/user.service')
const UserModel = require('../../databases/models/users')
const jwt = require('jsonwebtoken')

module.exports.handleLogin = async (username, password) => {
    if (!username || !password) {
        throw new Error('Please provide an username and password')
    }

    const user = await UserModel.findOne({ username }).select('+password')

    if (!user) {
        throw new Error('User not registered!')
    }
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        throw new Error('User not registered!')
    }

    const payload = { _id: user._id, username: user.username }
    const { accessToken, refreshToken } = user.generateToken(payload)

    return {
        ...payload,
        accessToken: accessToken,
        refreshToken: refreshToken,
    }
}

module.exports.refreshToken = async (token) => {
    const prefixToken = process.env.PREFIX_TOKEN

    if (!token.includes(prefixToken)) {
        throw new Error('Wrong prefix token')
    }

    const newToken = token.replace(process.env.PREFIX_TOKEN, '')

    const decoded = jwt.verify(newToken, process.env.JWT_REFRESH_TOKEN_KEY)

    const user = await UserService.getUserById(decoded._id)

    if (!user) {
        throw new Error('User not found!')
    }

    const payload = { _id: user._id, username: user.username }
    const { accessToken, refreshToken } = user.generateToken(payload)

    return {
        ...payload,
        accessToken: accessToken,
        refreshToken: refreshToken,
    }
}
