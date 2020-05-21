const { DataTypes, Model } = require('sequelize')
const { sequelizeClient } = require('../../../frameworks/db/drivers/sequelize-client')
const { TransactionEntity } = require('./entity')
const { transactionControllersDecorator } = require('./controllers')

class Transaction extends Model {}

Transaction.init(TransactionEntity(DataTypes), {
  sequelize: sequelizeClient,
  modelName: 'Transaction',
  timestamps: true,
  createdAt: 'effectiveDate',
  updatedAt: false
})

transactionControllersDecorator(Transaction)

module.exports.Transaction = Transaction
