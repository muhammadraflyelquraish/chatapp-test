const validate = require('@withvoid/make-validation')

module.exports.sendMessageValidation = (body) => {
    const validation = validate((types) => ({
        payload: body,
        checks: {
            message: { type: types.string },
        },
    }))

    return validation
}

module.exports.roomInitiationValidation = (body) => {
    const validation = validate((types) => ({
        payload: body,
        checks: {
            userIds: {
                type: types.array,
                options: { unique: true, empty: false, stringOnly: true },
            },
        },
    }))

    return validation
}
