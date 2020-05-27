const chai = require('chai')
const { INVALID_AMOUNT, INVALID_TRANSACTION } = require('../utils/constants')
const { isValidType, isValidAmount } = require('./entity')

const { expect } = chai

describe('Transaction Entity', () => {
  it('Expect negetive amount to fail', () => {
    expect(() => isValidAmount(-1)).to.throw(INVALID_AMOUNT)
  })

  it('Expect string amount to fail', () => {
    expect(() => isValidAmount('100')).to.throw(INVALID_AMOUNT)
  })

  it('Expect empty amount to fail', () => {
    expect(() => isValidAmount().to.throw(INVALID_AMOUNT))
  })

  it('Expect not credit/debit type to fail', () => {
    expect(() => isValidType('loan').to.throw(INVALID_TRANSACTION))
  })

  it('Expect empty type to fail', () => {
    expect(() => isValidType().to.throw(INVALID_TRANSACTION))
  })
})