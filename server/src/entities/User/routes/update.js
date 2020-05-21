
const { statusCodes } = require('../../../frameworks/api/routes/constants')
const { ERROR_SERVER, SUCCESS_UPDATED } = statusCodes

function updateRoutesDecorator({ router, User }) {
  router.put('/:id', async (req, res) => {
    try {
      const updates = await User.updateById(req.params.id, req.body)
      res.status(SUCCESS_UPDATED).send(`Values changed: ${updates[1]}`)
    } catch (err) {
      res.status(ERROR_SERVER).send({ error: err.message }) 
    }
  })
}

module.exports.updateRoutesDecorator = updateRoutesDecorator