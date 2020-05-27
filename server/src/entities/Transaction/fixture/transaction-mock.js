class TransactionMock {
  constructor(type, amount) {
    this.id = TransactionMock.currentId++
    this.type = type
    this.amount = amount
    TransactionMock.transactions[this.id] = this
  }

  static findAll() {
    return Object.values(TransactionMock.transactions)
  }

  static findByPk(id) {
    return TransactionMock.transactions[id];
  }

  static create({ type, amount }) {
    return new TransactionMock(type, amount)
  }
}
TransactionMock.currentId = 1
TransactionMock.transactions = {}


module.exports.TransactionMock = TransactionMock