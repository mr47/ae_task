
const { statusCodes } = require('../../../frameworks/api/routes/constants')
const { ERROR_SERVER, SUCCESS_DELETED } = statusCodes

function deleteRoutesDecorator({ router, User }) {
  router.delete('/:id', async (req, res) => {
    try {
      await User.deleteById(req.params.id)
      res.status(SUCCESS_DELETED).send()
    } catch (err) {
      res.status(ERROR_SERVER).send({ error: err.message }) 
    }
  })
}

module.exports.deleteRoutesDecorator = deleteRoutesDecorator