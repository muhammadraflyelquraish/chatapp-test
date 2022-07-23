require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const response = require('../src/utils/response')
const mongodb = require('./config/databases')
const AppModule = require('./app.module')

async function bootstrap() {
    const app = express()
    const PORT = process.env.APP_PORT || 5002

    app.use(logger('dev'))
    app.use(response)
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(AppModule)

    await mongodb((_) => {
        app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`))
    })
}

bootstrap()
