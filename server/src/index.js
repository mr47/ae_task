const { app } = require('./app')
const { db } = require('./frameworks/db')
const { User } = require('./entities/User/model')
const { PORT } = process.env

const mockGlobalUser = async () => {
  let user = await User.findOne({ where: { name: 'AgileEngine' } })
  if (!user) {
    console.log('Mocking Global User: "AgileEngine"')
    user = await User.createOne({ name: 'AgileEngine' })  
  }
  User.globalUser = user
}

const start = async (retry = true) => {
  try {
    await db.client.authenticate()
    await db.client.sync()
    await mockGlobalUser()
    console.log('Connecting to Database... OK!')
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  } catch (err) {
    console.log(`Details: ${err.message}`)
    if (retry) {
      console.log('Error connecting to database, retrying in 5 seconds...')
      setTimeout(async () => start(), 5000)
    }
  }
}

if (module.parent) {
  // Export for testing only
  module.exports = { start }
} else {
  start()
}
