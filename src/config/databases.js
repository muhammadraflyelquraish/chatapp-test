const mongoose = require('mongoose')

const connection = async (callback) => {
    const DB_HOST = process.env.MONGO_DB_HOST || 'chatapp'
    const DB_NAME = process.env.MONGO_DB_NAME || 'mongodb://localhost:27017'

    await mongoose
        .connect(DB_HOST.concat('/', DB_NAME), {
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
