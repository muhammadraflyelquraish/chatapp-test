const UserService = require('./user.service')

module.exports.getUsers = async (req, res) => {
    try {
        const users = await UserService.getUsers()
        res.success(users)
    } catch (err) {
        res.internal(err)
    }
}

module.exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await UserService.getUserById(userId)
        res.success(user)
    } catch (err) {
        res.badreq(err?.message)
    }
}

module.exports.createUser = async (req, res) => {
    try {
        const user = await UserService.createUser(req.body)
        res.success(user)
    } catch (err) {
        res.badreq(err?.message)
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await UserService.deleteUser(userId)
        res.success(null, `Deleted count: ${user.deletedCount}`)
    } catch (err) {
        res.badreq(err?.message)
    }
}
