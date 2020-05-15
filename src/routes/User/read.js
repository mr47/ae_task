const { statusCodes } = require('../constants')
const { User } = require('../../db/models/User')
const { SERVER_ERROR, SUCCESS_READ } = statusCodes

function readRoutesDecorator({ router }) {
  router.get('/', async (req, res) => {
    try {
      const allUsers = await User.getAll()
      res.status(SUCCESS_READ).send(allUsers)
    } catch (err) {
      res.status(SERVER_ERROR).send({ error: err.message }) 
    }
  })
}

module.exports.readRoutesDecorator = readRoutesDecorator