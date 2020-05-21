const { statusCodes } = require('../../../frameworks/api/routes/constants')
const { ERROR_SERVER, SUCCESS_READ } = statusCodes

function readRoutesDecorator({ router, User }) {
  router.get('/', async (req, res) => {
    try {
      const allUsers = await User.getAll()
      res.status(SUCCESS_READ).send(allUsers)
    } catch (err) {
      res.status(ERROR_SERVER).send({ error: err.message }) 
    }
  })
}

module.exports.readRoutesDecorator = readRoutesDecorator