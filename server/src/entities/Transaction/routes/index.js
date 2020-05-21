
const express = require('express');
const { Transaction } = require('../model/index')
const { readRoutesDecorator } = require('./read')
const { createRoutesDecorator } = require('./create')

const router = express.Router()

readRoutesDecorator({ router, Transaction })
createRoutesDecorator({ router, Transaction })

module.exports = router
