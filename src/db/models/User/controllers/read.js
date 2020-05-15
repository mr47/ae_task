module.exports.setReadControllers = (User) => {
  User.getAll = async () => User.findAll()
}
