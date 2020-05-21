const { statusCodes } = require('../../../frameworks/api/routes/constants')
const { SERVER_ERROR, SUCCESS_READ } = statusCodes

function readRoutesDecorator({ router, Transaction }) {
  router.get('/', async (req, res) => {
    try {
      const allTransactions = await Transaction.getAll()
      res.status(SUCCESS_READ).send(allTransactions)
    } catch (err) {
      res.status(SERVER_ERROR).send({ error: err.message }) 
    }
  })

  router.get('/:id', async (req, res) => {
    try {
      const transaction = await Transaction.getById(req.params.id)
      res.status(SUCCESS_READ).send(transaction)
    } catch (err) {
      res.status(SERVER_ERROR).send({ error: err.message }) 
    }
  })
}

module.exports.readRoutesDecorator = readRoutesDecorator