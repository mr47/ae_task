
const { statusCodes } = require('../../../frameworks/api/routes/constants')
const { SERVER_ERROR, SUCCESS_DELETED } = statusCodes

function deleteRoutesDecorator({ router, User }) {
  router.delete('/:id', async (req, res) => {
    try {
      await User.deleteById(req.params.id)
      res.status(SUCCESS_DELETED).send()
    } catch (err) {
      res.status(SERVER_ERROR).send({ error: err.message }) 
    }
  })
}

module.exports.deleteRoutesDecorator = deleteRoutesDecorator