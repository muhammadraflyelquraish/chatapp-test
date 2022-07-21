const express = require('express')
const sqlitedb = require('./config/databases')
const AppModule = require('./app.module')

async function bootstrap() {
    const app = express()
    const PORT = process.env.APP_PORT || 5002

    app.use(express.json())
    app.use(AppModule)

    await sqlitedb
        .sync({ force: false })
        .then((__) => {
            app.listen(PORT, () =>
                console.log(`Server: http://localhost:${PORT}`)
            )
        })
        .catch((err) => {
            console.log(`Database Error: ${err}`)
        })
}

bootstrap()
