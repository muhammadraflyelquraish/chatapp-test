const { Sequelize } = require('sequelize')

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: '../databases/chatapp.db',
})

module.exports = connection
