const { statusCodes } = require('../constants')
const { User } = require('../../db/models/User')
const { SERVER_ERROR, SUCCESS_CREATED } = statusCodes

function createRoutesDecorator({ router }) {
  router.post('/', async (req, res) => {
    try {
      const newUser = await User.createOne(req.body)
      res.status(SUCCESS_CREATED).send(newUser)
    } catch (err) {
      res.status(SERVER_ERROR).send({ error: err.message }) 
    }
  })
}

module.exports.createRoutesDecorator = createRoutesDecorator