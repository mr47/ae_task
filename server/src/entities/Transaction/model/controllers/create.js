const { User } = require('../../../User/model')
const { ConcurrencyManager } = require('../controllers/concurrency-manager')
const { CREDIT_TRANSACTION, DEBIT_TRANSACTION, INVALID_TRANSACTION, INVALID_AMOUNT, NO_FUNDS } = require ('../../utils/constants')

const handleCreditTransaction = async (user, amount) => {
  user.balance += amount
  return user.save()
}

const handleDebitTransaction = async (user, amount) => {
  if (user.balance < amount) throw NO_FUNDS
  user.balance -= amount
  return user.save()
}

const performTransaction = async (type, amount, user) => {
  if (type === CREDIT_TRANSACTION) return handleCreditTransaction(user, amount)
  if (type === DEBIT_TRANSACTION) return handleDebitTransaction(user, amount)
  throw INVALID_TRANSACTION
}

const handleTransaction = async ({ type, amount }, user) => ConcurrencyManager.doTransaction(
  user.id,
  async () => performTransaction(type, amount, user)
)

module.exports.setCreateControllers = (Transaction) => {
  Transaction.createOne = async ({ type, amount }) => {
    if (amount < 1) throw INVALID_AMOUNT
    const user = User.globalUser
    await handleTransaction({ type, amount }, user)
    return Transaction.create({ type, amount })
  }
}
