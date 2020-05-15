const express = require('express')
const cors = require('cors')
const { setRoutes } = require('./routes')
const { logger } = require('./middleware/logger')

const app = express()

app.use(logger)
app.use(cors())
app.use(express.json())
setRoutes(app)

app.get('/', (req, res) => res.status(200).send('RESTful API for AgileEngine'))

module.exports.app = app