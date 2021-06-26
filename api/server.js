const express = require("express")
// cars router
const server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send('Welcome to the API')
})

module.exports = server
