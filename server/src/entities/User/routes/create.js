const { statusCodes } = require('../../../frameworks/api/routes/constants')
const { SERVER_ERROR, SUCCESS_CREATED } = statusCodes

function createRoutesDecorator({ router, User }) {
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