module.exports.TransactionEntity = (DataTypes) => ({
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['credit', 'debit']],
        msg: 'Sorry, credit/debit transactions are supported only'
      }
    }
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})
