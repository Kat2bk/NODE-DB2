const express = require("express")
// cars router
const carsRouter = require('./cars/cars-router');
const server = express()
server.use(express.json())

server.use('/api/cars', carsRouter)

server.get('/', (req, res) => {
    res.send('Welcome to the API')
})

module.exports = server
