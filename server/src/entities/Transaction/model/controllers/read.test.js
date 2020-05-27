const chai = require('chai')
const { TransactionMock } = require('../../fixture/transaction-mock')
const { mockTransactions } = require('../../fixture/mock-transactions')
const { setReadControllers } = require('./read')
const { NOT_FOUND } = require('../../utils/constants')

const { expect } = chai

describe('Transaction - Read Controller', () => {
  const Transaction = TransactionMock
  let mockedTransactions
  before(() => {
    setReadControllers(Transaction)
    mockedTransactions = mockTransactions(Transaction)
  })

  it('Expect to read all transactions', async () => {
    const transactions = await Transaction.getAll()
    expect(transactions).to.not.be.empty
  })

  it('Expect to read existing transaction by id', async () => {
    const transaction = await Transaction.getById(1)
    expect(transaction).to.equal(mockedTransactions[0])
  })

  it('Expect attempt to read unexisting transaction to fail', () => {
    expect(async () => Transaction.getById(1000).to.throw(NOT_FOUND))
  })

  it('Expect attemp to read invalid id to fail', () => {
    expect(async () => Transaction.getById('a').to.throw(NOT_FOUND))
  })

  it('Expect attemp to read specific transaction with no id to fail', () => {
    expect(async () => Transaction.getById().to.throw(NOT_FOUND))
  })
})