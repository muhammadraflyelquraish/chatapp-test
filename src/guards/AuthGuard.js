const jwt = require('jsonwebtoken')
const AuthService = require('../modules/users/user.service')

const extractTokenFromHeader = (headers) => {
    const headerAuth = headers.authorization

    if (!headerAuth || !headerAuth.startsWith('Bearer ')) {
        throw new Error('No credensials send!')
    }

    const token = headerAuth.split(' ')[1]

    return token
}

module.exports = async (req, res, next) => {
    try {
        const token = await extractTokenFromHeader(req.headers)
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await AuthService.getUserById(decode._id)
        if (!user) {
            throw new Error('User not found!')
        }

        req.user = user
        next()
    } catch (error) {
        res.unauth(error?.message)
    }
}
