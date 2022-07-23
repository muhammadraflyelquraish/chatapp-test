require('dotenv').config()
const http = require('http')
const express = require('express')
const logger = require('morgan')
const response = require('../src/utils/response')
const socketio = require('socket.io')
const WebSockets = require('./utils/WebSockets')
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

    // @ Socket Connection
    const server = http.createServer(app)
    global.io = socketio.listen(server)
    global.io.on('connection', WebSockets.connection)

    await mongodb((_) => {
        server.listen(PORT, () =>
            console.log(`Server: http://localhost:${PORT}`)
        )
    })
}

bootstrap()
