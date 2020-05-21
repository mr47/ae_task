const { NOT_FOUND } = require ('../../utils/constants')
const { successResponse, errorResponse } = require ('../../../../frameworks/api/routes/response-handler')
const { statusCodes } = require('../../../../frameworks/api/routes/constants')
const { ERROR_SERVER, SUCCESS_CREATED, SUCCESS_READ, SUCCESS_UPDATED, SUCCESS_DELETED, ERROR_NOT_FOUND} = statusCodes


const getReadErrorStatusCode = (err) => {
  if (err === NOT_FOUND) return ERROR_NOT_FOUND
  return ERROR_SERVER 
}

const getCreatedErrorStatusCode = () => ERROR_SERVER
const getUpdatedErrorStatusCode = () => ERROR_SERVER
const getDeletedErrorStatusCode = () => ERROR_SERVER

module.exports.createdSuccessResponse = (res, body) => successResponse(res, SUCCESS_CREATED, body)

module.exports.readSuccessResponse = (res, body) => successResponse(res, SUCCESS_READ, body)

module.exports.updatedSuccessResponse = (res, body) => successResponse(res, SUCCESS_UPDATED, body)

module.exports.deletedErrorResponse = (res, body) => successResponse(res, SUCCESS_DELETED, body)

module.exports.readErrorResponse = (res, err) => errorResponse(res, getReadErrorStatusCode(err), err)

module.exports.createdErrorResponse = (res, err) => errorResponse(res, getCreatedErrorStatusCode(err), err)

module.exports.updatedErrorResponse = (res, err) => errorResponse(res, getUpdatedErrorStatusCode(err), err)

module.exports.deletedErrorResponse = (res, err) => errorResponse(res, getDeletedErrorStatusCode(err), err)