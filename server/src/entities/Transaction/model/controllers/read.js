const { NOT_FOUND } = require('../../utils/constants')

module.exports.setReadControllers = (Transaction) => {
  Transaction.getAll = async () => Transaction.findAll()

  Transaction.getById = async (id) => {
    const transaction = await Transaction.findByPk(id)
    if (!transaction) throw NOT_FOUND
    return transaction
  }
}
