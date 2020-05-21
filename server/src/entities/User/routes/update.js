const { updatedSuccessResponse, updatedErrorResponse } = require('./utils/handle-response')

function updateRoutesDecorator({ router, User }) {
  router.put('/:id', async (req, res) => {
    try {
      const updates = await User.updateById(req.params.id, req.body)
      return updatedSuccessResponse(res, `Values changed: ${updates[1]}`)
    } catch (err) {
      return updatedErrorResponse(res, err.message)
    }
  })
}

module.exports.updateRoutesDecorator = updateRoutesDecorator