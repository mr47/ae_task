const express = require('express')
const { inspect } = require('util')
const { setRoutes } = require('./routes')
const { logger } = require('./middleware/logger')

const app = express()

app.use(logger)
app.use(express.json())
setRoutes(app)

app.get('/', (req, res) => res.status(200).send('RESTful API Boilerplate'))
app.get('/db', (req, res) => res.status(200).send(inspect(app.db)))



module.exports.app = app