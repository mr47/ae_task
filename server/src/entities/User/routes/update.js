
const { statusCodes } = require('../../../frameworks/api/routes/constants')
const { SERVER_ERROR, SUCCESS_UPDATED } = statusCodes

function updateRoutesDecorator({ router, User }) {
  router.put('/:id', async (req, res) => {
    try {
      const updates = await User.updateById(req.params.id, req.body)
      res.status(SUCCESS_UPDATED).send(`Values changed: ${updates[1]}`)
    } catch (err) {
      res.status(SERVER_ERROR).send({ error: err.message }) 
    }
  })
}

module.exports.updateRoutesDecorator = updateRoutesDecorator