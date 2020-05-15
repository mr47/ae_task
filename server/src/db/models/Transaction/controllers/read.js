module.exports.setReadControllers = (Transaction) => {
  Transaction.getAll = async () => Transaction.findAll()

  Transaction.getById = async (id) => Transaction.findByPk(id)
}
