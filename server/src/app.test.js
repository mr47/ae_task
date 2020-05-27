const chai = require('chai')
const sinon = require('sinon')
const chaiHttp = require('chai-http')
const { app } = require('./app')
const { start } = require('./index')
const { db } = require('./frameworks/db')

chai.use(chaiHttp)
const { expect } = chai

describe('Web Service', function() {
  context('Server listening', function() {
    afterEach(() => {
      sinon.restore();
    })

    it('Expect a valid response from GET "/"', async () => {
      const res = await chai.request(app).get('/')
      expect(res).to.have.status(200)
    })

    it('Expect to validate database connection on serving app', () => {
      sinon.replace(app, 'listen', sinon.fake())
      sinon.replace(db.client, 'authenticate', sinon.fake())
      sinon.replace(db.client, 'sync', sinon.fake())
      start(false)
      expect(app.listen.calledOnce)
      expect(db.client.authenticate.calledOnce)
      expect(db.client.sync.calledOnce)
    })
  })
})
