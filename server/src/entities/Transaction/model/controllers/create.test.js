const chai = require('chai')
const sinon = require('sinon')
const { TransactionMock } = require('../../fixture/transaction-mock')
const { UserMock } = require('../../../User/fixture/user-mock')
const { ConcurrencyManager } = require('../controllers/concurrency-manager')
const { validTransaction, validCreditTransaction, validDebitTransaction } = require('../../fixture/mock-transactions')
const entity = require('../entity')
const { NO_FUNDS } = require('../../utils/constants')
const { createControllers } = require('./create') 

const { expect } = chai

describe('Transaction - Create Controller', () => {
  const Transaction = TransactionMock

  context('Transaction Entity & User Controllers mocked', () => {
    let mockedUser
    before(() => {
      mockedUser = new UserMock('Tester')
      createControllers.setControllers(Transaction)
    })
    
    beforeEach(() => mockedUser.restart())
    afterEach(() => sinon.restore())

    it('Expect entity to validate transaction type and amount', () => {
      sinon.replace(entity, 'isValidType', sinon.fake())
      sinon.replace(entity, 'isValidAmount', sinon.fake())
      createControllers.validateTransaction(validTransaction)
      expect(entity.isValidType.calledOnce)
      expect(entity.isValidAmount.calledOnce)
    })

    it('Expect to perform transaction by calling proper type handler', async () => {
      sinon.replace(createControllers, 'handleCreditTransaction', sinon.fake())
      sinon.replace(createControllers, 'handleDebitTransaction', sinon.fake())
      await createControllers.performTransaction(...Object.values(validCreditTransaction), mockedUser.id)
      expect(createControllers.handleCreditTransaction.calledOnce)
      await createControllers.performTransaction(...Object.values(validDebitTransaction), mockedUser.id)
      expect(createControllers.handleDebitTransaction.calledOnce)
    })

    it('Expect to handle concurency once starting a transaction', async () => {
      sinon.replace(ConcurrencyManager, 'doTransaction', sinon.fake())
      sinon.replace(createControllers, 'performTransaction', sinon.fake())
      await createControllers.handleTransaction(validCreditTransaction, mockedUser)
      expect(ConcurrencyManager.doTransaction.calledOnce)
      expect(ConcurrencyManager.doTransaction.calledWith(mockedUser.id))
      expect(createControllers.performTransaction.calledOnce)
    })

    it('Expect to increase user\'s balance on credit transaction', async () => {
      const prevUserBalance = mockedUser.balance
      const creditAmount = 1000
      await createControllers.handleCreditTransaction(mockedUser, creditAmount)
      expect(mockedUser.balance).to.equal(prevUserBalance + creditAmount)
    })


    it('Expect to decrease user\'s balance on debit transaction if user has enough funds', async () => {
      const startingBalance = 1000
      mockedUser.balance = startingBalance
      const debitAmount = 999
      await createControllers.handleDebitTransaction(mockedUser, debitAmount)
      expect(mockedUser.balance).to.equal(startingBalance - debitAmount)
    })

    it('Expect to debit all user funds', async () => {
      const funds = 10000
      mockedUser.balance = funds
      await createControllers.handleDebitTransaction(mockedUser, funds)
      expect(mockedUser.balance).to.equal(0)
    })

    it('Expect to fail on debit transaction if user does not have enough funds', async () => {
      const startingBalance = 1000
      const debitAmount = startingBalance + 1
      expect(async () => await createControllers.handleTransaction(mockedUser, debitAmount).to.throw(NO_FUNDS))
    })
  })
})
