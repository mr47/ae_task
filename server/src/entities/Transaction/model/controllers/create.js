const { User } = require('../../../User/model')
const { CREDIT_TRANSACTION, DEBIT_TRANSACTION } = require ('../constants')

const handleCreditTransaction = async (user, amount) => {
  user.balance += amount
  try {
    await user.save()
    return user
  } catch (err) {
    return { error: err.message }
  }
}

const handleDebitTransaction = async (user, amount) => {
  if (user.balance < amount) return { error: 'Not enough funds' }
  user.balance -= amount
  try {
    await user.save()
    return user
  } catch (err) {
    return { error: err.message }
  }
}

const handleTransaction = async (type, amount) => {
  const user = User.globalUser
  if (type === CREDIT_TRANSACTION) return handleCreditTransaction(user, amount)
  if (type === DEBIT_TRANSACTION) return handleDebitTransaction(user, amount)
  return { error: 'Invalid Transaction Type' }
}

module.exports.setCreateControllers = (Transaction) => {
  Transaction.createOne = async ({ type, amount }) => {
    try {
      const userAfterTransaction = await handleTransaction(type, amount)
      if (userAfterTransaction.error) return userAfterTransaction
      return Transaction.create({ type, amount })
    } catch (err) {
      return { error: err, description: err.message }
    }
  }
}
