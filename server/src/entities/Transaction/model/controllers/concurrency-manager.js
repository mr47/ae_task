const { CONCURRENCY_ERROR } = require('../../utils/constants')

class ConcurrencyManager {
  constructor(userId) {
    // Only one manager per user
    if (ConcurrencyManager.instances[userId]) {
      return ConcurrencyManager.instances[userId]
    }

    this.userId = userId
    this.processing = false
    ConcurrencyManager.instances[userId] = this
  }

  isProcessing() { return this.processing }

  startTransaction() {
    console.log('Transaction Started...');
    this.processing = true
  }

  endTransaction() {
    console.log('Transaction Ended.');
    this.processing = false
  }
  
  static doTransaction(userId, transaction) {
    const manager = new ConcurrencyManager(userId)
    if (manager.isProcessing()) throw CONCURRENCY_ERROR
    manager.startTransaction()
    return transaction().finally(() => manager.endTransaction())
  }
}

/* 
# TODO #
Each user instanciates a ConcurrencyManager once first transaction is made,
it would be important to have a way to purge ConcurrencyManager instance that
have been inactive for a while. Maybe keep track of instance time and run a background worker?
*/
ConcurrencyManager.instances = {}

module.exports.ConcurrencyManager = ConcurrencyManager