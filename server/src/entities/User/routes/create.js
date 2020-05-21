const { statusCodes } = require('../../../frameworks/api/routes/constants')
const { ERROR_SERVER, SUCCESS_CREATED } = statusCodes

function createRoutesDecorator({ router, User }) {
  router.post('/', async (req, res) => {
    try {
      const newUser = await User.createOne(req.body)
      res.status(SUCCESS_CREATED).send(newUser)
    } catch (err) {
      res.status(ERROR_SERVER).send({ error: err.message }) 
    }
  })
}

module.exports.createRoutesDecorator = createRoutesDecorator