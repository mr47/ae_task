const { CONCURRENCY_ERROR, INVALID_TRANSACTION, INVALID_AMOUNT, NO_FUNDS, NOT_FOUND } = require ('../../utils/constants')
const { successResponse, errorResponse } = require ('../../../../frameworks/api/routes/response-handler')
const { statusCodes } = require('../../../../frameworks/api/routes/constants')
const { ERROR_SERVER, SUCCESS_CREATED, SUCCESS_READ, ERROR_NOT_FOUND, FORBIDDEN_TRANSACTION } = statusCodes


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

module.exports.createdSuccessResponse = (res, body) => successResponse(res, SUCCESS_CREATED, body)

module.exports.readSuccessResponse = (res, body) => successResponse(res, SUCCESS_READ, body)

module.exports.readErrorResponse = (res, err) => errorResponse(res, getReadErrorStatusCode(err), err)

module.exports.createdErrorResponse = (res, err) => errorResponse(res, getCreatedErrorStatusCode(err), err)
