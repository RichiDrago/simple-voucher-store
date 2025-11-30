/**
 * HTTP status codes.
 * @typedef {Object} HttpStatusCodes
 * @property {number} OK - 200 OK
 * @property {number} CREATED - 201 Created
 * @property {number} BAD_REQUEST - 400 Bad Request
 * @property {number} UNAUTHORIZED - 401 Unauthorized
 * @property {number} FORBIDDEN - 403 Forbidden
 * @property {number} NOT_FOUND - 404 Not Found
 * @property {number} CONFLICT - 409 Conflict
 * @property {number} UNPROCESSABLE_CONTENT - 422 Unprocessable Content
 * @property {number} INTERNAL_SERVER - 500 Internal Server Error
 */
export default {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_CONTENT: 422,
    INTERNAL_SERVER: 500,
};
