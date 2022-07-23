const AuthService = require('./auth.service')

module.exports.handleLogin = async (req, res) => {
    const { userId } = req.params
    try {
        const auth = await AuthService.handleLogin(userId)
        res.success(auth)
    } catch (err) {
        res.badreq(err?.message)
    }
}
