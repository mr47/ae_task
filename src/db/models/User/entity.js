module.exports.UserEntity = (DataTypes) => ({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
})
