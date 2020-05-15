const express = require('express');
const { readRoutesDecorator } = require('./read')
const { createRoutesDecorator } = require('./create')
const { updateRoutesDecorator } = require('./update')
const { deleteRoutesDecorator } = require('./delete')

const router = express.Router()

readRoutesDecorator({ router })
createRoutesDecorator({ router })
updateRoutesDecorator({ router })
deleteRoutesDecorator({ router })

module.exports = router
