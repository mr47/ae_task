module.exports.setDeleteControllers = (User) => {
  User.deleteById = async (id) => User.destroy({ where: { id } })
}
