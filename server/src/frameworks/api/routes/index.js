const userRouter = require('../../../entities/User/routes')
const transactionRouter = require('../../../entities/Transaction/routes')

function setRoutes(app) {
  app.use('/users', userRouter)
  app.use('/transactions', transactionRouter)
}

module.exports.setRoutes = setRoutes