const commonHelper = require('./common.helper')

function modelTransform(model) {
    return commonHelper.modelTransform(model)
}

function pagination(query, params) {
    return commonHelper.pagination(query, params)
}

module.exports = {
    modelTransform: modelTransform,
    pagination: pagination
}