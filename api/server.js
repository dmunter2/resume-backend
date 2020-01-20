const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')


const server = express()

server.use(cors())
server.use(express.json())

server.get('/', (req,res) => {
    res.send('Your in')
})


module.exports = server;



