module.exports.UserCreateBody = (req) => {
    return {
        name: req.name,
        username: req.username,
        password: req.password,
    }
}
