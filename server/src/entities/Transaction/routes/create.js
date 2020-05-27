const { createdSuccessResponse, createdErrorResponse } = require('./utils/handle-response')

function createRoutesDecorator({ router, Transaction }) {
  router.post('/', async (req, res) => {
    try {
      const transaction = await Transaction.createOne(req.body)
      return createdSuccessResponse(res, transaction)
    } catch (err) {
      console.log(err)
      return createdErrorResponse(res, err)
    }
  })
}

module.exports.createRoutesDecorator = createRoutesDecorator