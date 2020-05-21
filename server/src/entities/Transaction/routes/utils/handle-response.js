const { CONCURRENCY_ERROR, NO_FUNDS } = require ('../../utils/constants')
const { statusCodes } = require('../../../../frameworks/api/routes/constants')
const { SERVER_ERROR, SUCCESS_CREATED, SUCCESS_READ, FORBIDDEN_TRANSACTION } = statusCodes

const buildErrorBody = (message) => ({ error: message })

module.exports.createdSuccessResponse = (res, body) => res
  .status(SUCCESS_CREATED)
  .send(body)

module.exports.readSuccessResponse = (res, body) => res
  .status(SUCCESS_READ)
  .send(body)

module.exports.readErrorResponse = (res, err) => res
  .status(SERVER_ERROR)
  .send(buildErrorBody(err.message))

module.exports.createdErrorResponse = (res, err) => {
  let code = SERVER_ERROR;
  if ([CONCURRENCY_ERROR, NO_FUNDS].includes(err)) {
    code = FORBIDDEN_TRANSACTION
  }
  return res.status(code).send(buildErrorBody(err))
}
