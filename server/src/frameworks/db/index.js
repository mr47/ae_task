const { sequelizeClient } = require('./drivers/sequelize-client')
const { loadModels, createAssociations } = require('./drivers/sequelize-init')

const models = [
  { name: 'User', model: require('../../entities/User/model') },
  { name: 'Transaction', model: require('../../entities/Transaction/model') }
]

const db = {}

loadModels(models, db)
createAssociations(db)

db.client = sequelizeClient

module.exports.db = db