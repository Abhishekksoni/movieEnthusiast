const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data)

const error = (res) => (res, 500, {
    status: 500,
    message: "Oops! something is wrong"
})

const badRequest = (res, message) => (res, 400, {
    status: 400,
    message
})

const ok = (res, data) => responseWithData(res, 200, data)

const created = (res, data) => responseWithData(res, 201, data)

const unauthorize = (res) => responseWithData(res, 401, {
    status: 401,
    message: "Unauthorized"
})

const notfound = (res) => responseWithData(res, 404, {
    status: 404,
    message: "Resouce not found"
})

export default {
    error,
    badRequest,
    ok,
    created,
    unauthorize,
    notfound
}