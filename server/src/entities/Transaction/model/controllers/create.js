const { User } = require('../../../User/model')
const { isValidAmount, isValidType } = require('../entity')
const { ConcurrencyManager } = require('../controllers/concurrency-manager')
const { CREDIT_TRANSACTION, DEBIT_TRANSACTION, NO_FUNDS } = require ('../../utils/constants')

const controllers = {
  handleCreditTransaction: async (user, amount) => {
    user.balance += amount
    return user.save()
  },

  handleDebitTransaction: async (user, amount) => {
    console.log(user.balance < amount)
    if (user.balance < amount) throw NO_FUNDS
    user.balance -= amount
    return user.save()
  },

  performTransaction: async function (type, amount, user) {
    if (type === CREDIT_TRANSACTION) return this.handleCreditTransaction(user, amount)
    if (type === DEBIT_TRANSACTION) return this.handleDebitTransaction(user, amount)
  },

  handleTransaction: async function ({ type, amount }, user) {
    return ConcurrencyManager.doTransaction(
      user.id,
      async () => this.performTransaction(type, amount, user)
    )
  },

  validateTransaction: ({ type, amount }) => isValidType(type) && isValidAmount(amount),

  setControllers: function (Transaction) {
    Transaction.createOne = async ({ type, amount }) => {
      const user = User.globalUser
      this.validateTransaction({ type, amount })
      await this.handleTransaction({ type, amount }, user)
      return Transaction.create({ type, amount })
    }
  },
}

module.exports.createControllers = controllers
