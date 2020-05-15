
module.exports.setUpdateControllers = (User) => {
  User.updateById = async (id, { name, email, password }) => User.update(
    { name, email, password },
    {
      where: { id },
      fields: ['name', 'email', 'password'],
      returning: true,
      plain: true
    }
  )
}