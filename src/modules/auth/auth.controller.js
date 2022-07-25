const AuthService = require('./auth.service')
module.exports.handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await AuthService.handleLogin(username, password)
        res.success(user)
    } catch (err) {
        res.badreq(err?.message)
    }
}

module.exports.refreshToken = async (req, res) => {
    const { token } = req.body
    try {
        const refresh = await AuthService.refreshToken(token)
        res.success(refresh)
    } catch (err) {
        res.badreq(err?.message)
    }
}
