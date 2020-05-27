const { createControllers } = require('./create')
const { setReadControllers } = require('./read')
const { setUpdateControllers } = require('./update')
const { setDeleteControllers } = require('./delete')

module.exports.transactionControllersDecorator = (Transaction) => {
  createControllers.setControllers(Transaction)
  setReadControllers(Transaction)
  setUpdateControllers(Transaction)
  setDeleteControllers(Transaction)
}