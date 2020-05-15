const { setCreateControllers } = require('./create')
const { setReadControllers } = require('./read')
const { setUpdateControllers } = require('./update')
const { setDeleteControllers } = require('./delete')

module.exports.transactionControllersDecorator = (Transaction) => {
  setCreateControllers(Transaction)
  setReadControllers(Transaction)
  setUpdateControllers(Transaction)
  setDeleteControllers(Transaction)
}