const { CREDIT_TRANSACTION, DEBIT_TRANSACTION, INVALID_TRANSACTION, INVALID_AMOUNT } = require('../utils/constants')

module.exports.TransactionEntity = (DataTypes) => ({
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['credit', 'debit']],
        msg: 'Sorry, credit or debit transactions are supported only'
      }
    }
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1,
        msg: '"amount" must be a positive number'
      }
    }
  },
})

module.exports.isValidType = (type) => {
  if ([CREDIT_TRANSACTION, DEBIT_TRANSACTION].indexOf(type) !== -1) return true
  throw INVALID_TRANSACTION
}

module.exports.isValidAmount = (amount) => {
  if (Number.isInteger(amount) && amount >= 1) return true
  throw INVALID_AMOUNT
}