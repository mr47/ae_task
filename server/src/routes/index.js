const userRouter = require('./User')
const transactionRouter = require('./Transaction')

function setRoutes(app) {
  app.use('/users', userRouter)
  app.use('/transactions', transactionRouter)
}

module.exports.setRoutes = setRoutes