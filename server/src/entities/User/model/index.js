const { DataTypes, Model } = require('sequelize')
const { sequelizeClient } = require('../../../frameworks/db/drivers/sequelize-client')
const { UserEntity } = require('./entity')
const { userControllersDecorator } = require('./controllers')

class User extends Model {}

User.init(UserEntity(DataTypes), {
  sequelize: sequelizeClient,
  modelName: 'User'
})

userControllersDecorator(User)

 
module.exports.User = User
