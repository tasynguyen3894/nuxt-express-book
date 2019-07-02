const commonHelper = require('./common.helper')

function modelTransform(model) {
    model = commonHelper.modelTransform(model)
    delete model.password
    return model
}

function pagination(query, params) {
    return commonHelper.pagination(query, params)
}

module.exports = {
    modelTransform: modelTransform,
    pagination: pagination
}