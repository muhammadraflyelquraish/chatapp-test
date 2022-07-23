module.exports = (req, res, next) => {
    res.success = function (result = [], message, code = 200, success = true) {
        return res.json({
            success: success,
            code: code,
            message: message,
            data: result,
        })
    }

    res.badreq = function (error, message, code = 400, success = false) {
        return res.status(code).json({
            success: success,
            code: code,
            message: message,
            error: error,
        })
    }

    res.internal = function (error, message, code = 500, success = false) {
        return res.status(code).json({
            success: success,
            code: code,
            message: message,
            error: error,
        })
    }

    res.forbidden = function (error, message, code = 403, success = false) {
        return res.status(code).json({
            success: success,
            code: code,
            message: message,
            error: error,
        })
    }

    res.unauth = function (error, message, code = 401, success = false) {
        return res.status(code).json({
            success: success,
            code: code,
            message: message,
            error: error,
        })
    }

    next()
}
