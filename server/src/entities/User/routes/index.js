const express = require('express');
const { User } = require('../model')
const { readRoutesDecorator } = require('./read')
const { createRoutesDecorator } = require('./create')
const { updateRoutesDecorator } = require('./update')
const { deleteRoutesDecorator } = require('./delete')

const router = express.Router()

readRoutesDecorator({ router, User })
createRoutesDecorator({ router, User })
updateRoutesDecorator({ router, User })
deleteRoutesDecorator({ router, User })

module.exports = router
