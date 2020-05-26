const buildErrorBody = (message) => ({ error: message })

module.exports.successResponse = (res, statusCode, body) => res
  .status(statusCode)
  .send(body)

module.exports.errorResponse = (res, statusCode, error) => res
  .status(statusCode)
  .send(statusCode === 500 ? 'Unhandled Error' : buildErrorBody(error))
