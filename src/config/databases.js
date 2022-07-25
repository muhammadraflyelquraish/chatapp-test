const mongoose = require('mongoose')

const connection = async (callback) => {
    const DB_NAME = process.env.MONGO_DB_NAME || 'chatapp'
    const DB_HOST = process.env.MONGO_DB_HOST || 'mongodb://localhost'
    const DB_PORT = process.env.MONGO_DB_PORT || '27017'

    await mongoose
        .connect(`${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((client) => {
            console.log('Mongo Connected!')
            callback(client)
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = connection
