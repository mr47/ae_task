
const express = require('express');
const { readRoutesDecorator } = require('./read')
const { createRoutesDecorator } = require('./create')

const router = express.Router()

readRoutesDecorator({ router })
createRoutesDecorator({ router })

module.exports = router
