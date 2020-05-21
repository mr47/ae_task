const { CONCURRENCY_ERROR, INVALID_TRANSACTION, INVALID_AMOUNT, NO_FUNDS, NOT_FOUND } = require ('../../utils/constants')
const { statusCodes } = require('../../../../frameworks/api/routes/constants')
const { ERROR_SERVER, SUCCESS_CREATED, SUCCESS_READ, ERROR_NOT_FOUND, FORBIDDEN_TRANSACTION } = statusCodes

const buildErrorBody = (message) => ({ error: message })

const getReadErrorStatusCode = (err) => {
  if (err === NOT_FOUND) return ERROR_NOT_FOUND
  return ERROR_SERVER 
}

const getCreatedErrorStatusCode = (err) => {
  if ([CONCURRENCY_ERROR, NO_FUNDS, INVALID_TRANSACTION, INVALID_AMOUNT].includes(err)) {
    return FORBIDDEN_TRANSACTION
  }
  return ERROR_SERVER
}

module.exports.createdSuccessResponse = (res, body) => res
  .status(SUCCESS_CREATED)
  .send(body)

module.exports.readSuccessResponse = (res, body) => res
  .status(SUCCESS_READ)
  .send(body)

module.exports.readErrorResponse = (res, err) => res
  .status(getReadErrorStatusCode(err))
  .send(buildErrorBody(err))

module.exports.createdErrorResponse = (res, err) => res
    .status(getCreatedErrorStatusCode(err))
    .send(buildErrorBody(err))
