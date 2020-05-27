const { CREDIT_TRANSACTION, DEBIT_TRANSACTION } = require ('../utils/constants')

module.exports.mockTransactions = (Transaction) => [
  new Transaction(CREDIT_TRANSACTION, 1000),
  new Transaction(DEBIT_TRANSACTION, 300),
  new Transaction(DEBIT_TRANSACTION, 100),
]

module.exports.validTransaction = { type: CREDIT_TRANSACTION, amount: 100 }
module.exports.validCreditTransaction = this.validTransaction
module.exports.validDebitTransaction = { type: DEBIT_TRANSACTION, amount: 1 } 