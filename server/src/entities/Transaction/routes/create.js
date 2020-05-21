const { statusCodes } = require('../../../frameworks/api/routes/constants')
const { SERVER_ERROR, SUCCESS_CREATED, FORBIDDEN_TRANSACTION } = statusCodes

function createRoutesDecorator({ router, Transaction }) {
  router.post('/', async (req, res) => {
    try {
      const transaction = await Transaction.createOne(req.body)

      if (transaction.error) {
        return res.status(FORBIDDEN_TRANSACTION).send(transaction)
      }

      res.status(SUCCESS_CREATED).send(transaction)
    } catch (err) {
      res.status(SERVER_ERROR).send({ error: err.message }) 
    }
  })
}

module.exports.createRoutesDecorator = createRoutesDecorator