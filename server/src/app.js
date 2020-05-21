const express = require('express')
const cors = require('cors')
const { setRoutes } = require('./frameworks/api/routes')
const { logger } = require('./frameworks/api/middleware/logger')

const app = express()

app.use(logger)
app.use(cors())
app.use(express.json())
setRoutes(app)

app.get('/', (req, res) => res.status(200).send('RESTful API for AgileEngine'))

module.exports.app = app