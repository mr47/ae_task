const chai = require('chai')
const sinon = require('sinon')
const { ConcurrencyManager } = require('./concurrency-manager')
const { UserMock } = require('../../../User/fixture/user-mock')
const { CONCURRENCY_ERROR } = require('../../utils/constants')

const { expect } = chai

describe('Concurrency Manager', () => {

  context('User Mocked', () => {
    let concurrencyManager, mockedUser
    before(() => {
      mockedUser = new UserMock('Tester')
      concurrencyManager = new ConcurrencyManager(mockedUser.id)
    })

    beforeEach(() => concurrencyManager.endTransaction())
    afterEach(() => sinon.restore())

    it('Expect a concurrency manager to work as singletons for each user', () => {
      expect(new ConcurrencyManager(mockedUser.id)).to.equal(concurrencyManager)
    })

    it('Expect to retrieve current processing status', () => {
      expect(concurrencyManager.isProcessing()).to.equal(concurrencyManager.processing)
    })

    it('Expect processing flag set to true when starting a transaction', () => {
      concurrencyManager.startTransaction()
      expect(concurrencyManager.isProcessing()).to.be.true
    })

    it('Expect processing flag set to false when ending a transaction', () => {
      concurrencyManager.processing = true
      concurrencyManager.endTransaction()
      expect(concurrencyManager.isProcessing()).to.be.false
    })

    it('Expect concurrency manager to start and end a transaction by itself', () => {
      const transaction = sinon.fake.resolves()
      sinon.replace(concurrencyManager, 'startTransaction', sinon.fake())
      sinon.replace(concurrencyManager, 'endTransaction', sinon.fake())
      ConcurrencyManager.doTransaction(mockedUser.id, transaction)
      expect(transaction.calledOnce)
      expect(concurrencyManager.startTransaction.calledOnce)
      expect(concurrencyManager.endTransaction.calledOnce)
    })

    it('Expect to fail if concurrent transactions are attempted to same user', () => {
      const fakeTransaction = sinon.fake(() => new Promise((resolve) => {
        () => setTimeout(() => resolve(), 1000)
      }))
      ConcurrencyManager.doTransaction(mockedUser.id, fakeTransaction)
      expect(fakeTransaction.calledOnce)
      expect(() => ConcurrencyManager.doTransaction(
        mockedUser, fakeTransaction
      ).to.throw(CONCURRENCY_ERROR))
    })

    it('Expect to success concurrent transactions for different users', () => {
      const fakeTransaction = sinon.fake(() => new Promise((resolve) => {
        () => setTimeout(() => resolve(), 1000)
      }))
      const newMockedUser = new UserMock('Tester2')
      ConcurrencyManager.doTransaction(mockedUser.id, fakeTransaction)
      ConcurrencyManager.doTransaction(newMockedUser.id, fakeTransaction)
      expect(fakeTransaction.calledTwice)
    })

  })
})