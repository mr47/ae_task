
const { createdSuccessResponse, createdErrorResponse } = require('./utils/handle-response')

function createRoutesDecorator({ router, User }) {
  router.post('/', async (req, res) => {
    try {
      const newUser = await User.createOne(req.body)
      return createdSuccessResponse(res, newUser)
    } catch (err) {
      return createdErrorResponse(res, err.message)
    }
  })
}

module.exports.createRoutesDecorator = createRoutesDecorator