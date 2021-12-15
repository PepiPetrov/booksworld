const express = require('express')
const compression = require('compression')
const app = express()

app.use(express.json({ extended: true }))

app.use(express.static('public'))

app.use(compression())

module.exports = app