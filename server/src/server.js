const express = require('express')
const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// show requests and responses on console
server.use((req, res, next) => {
  console.log(req.method, req.originalUrl)
  console.log(res.statusCode, res.statusMessage)
  next()
})

module.exports = server
