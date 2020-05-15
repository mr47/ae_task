const { sequelizeClient } = require('./drivers/sequelize-client')
const { loadModels, createAssociations } = require('./drivers/sequelize-init')

const models = [
  { name: 'User', model: require('./models/User') },
  { name: 'Transaction', model: require('./models/Transaction') }
]

const db = {}

loadModels(models, db)
createAssociations(db)

db.client = sequelizeClient

module.exports.db = db