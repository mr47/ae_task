const { deletedSuccessResponse, deletedErrorResponse } = require('./utils/handle-response')

function deleteRoutesDecorator({ router, User }) {
  router.delete('/:id', async (req, res) => {
    try {
      await User.deleteById(req.params.id)
      return deletedSuccessResponse(res)
    } catch (err) {
      return deletedErrorResponse(res, err.message)
    }
  })
}

module.exports.deleteRoutesDecorator = deleteRoutesDecorator