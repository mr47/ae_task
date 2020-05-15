module.exports.setCreateControllers = (User) => {
  User.createOne = async ({ name, email, password }) => User.create({ name, email, password })
}
