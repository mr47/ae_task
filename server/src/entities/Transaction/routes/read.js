const { readSuccessResponse, readErrorResponse } = require('./utils/handle-response')

function readRoutesDecorator({ router, Transaction }) {
  router.get('/', async (req, res) => {
    try {
      const allTransactions = await Transaction.getAll()
      return readSuccessResponse(res, allTransactions)
    } catch (err) {
      return readErrorResponse(res, err)
    }
  })

  router.get('/:id', async (req, res) => {
    try {
      const transaction = await Transaction.getById(req.params.id)
      return readSuccessResponse(res, transaction)
    } catch (err) {
      return readErrorResponse(res, err)
    }
  })
}

module.exports.readRoutesDecorator = readRoutesDecorator