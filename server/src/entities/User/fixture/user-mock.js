class UserMock {
  constructor(name, balance = 0) {
    this.id = UserMock.currentId++
    this.name = name
    this.originalBalance = balance
    this._balance = balance
  }

  async save() {
    return Promise.resolve()
  }
 
  restart() {
    this.balance = this.originalBalance
  }

  get balance() {
    return this._balance
  }

  set balance(newBalance) {
    this._balance = newBalance
  }
}
UserMock.currentId = 1

module.exports.UserMock = UserMock