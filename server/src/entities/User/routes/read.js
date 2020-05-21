const { readSuccessResponse, readErrorResponse } = require('./utils/handle-response')

function readRoutesDecorator({ router, User }) {
  router.get('/', async (req, res) => {
    try {
      const allUsers = await User.getAll()
      return readSuccessResponse(res, allUsers) 
    } catch (err) {
      return readErrorResponse(res, err.message)
    }
  })
}

module.exports.readRoutesDecorator = readRoutesDecorator