function modelTransform(model) {
    if(typeof model.toObject !== "undefined") {
        model = model.toObject()
    }
    if(model._id) {
        model.id = model._id
    }

    delete model._id
    delete model.__v
    return model
}

function pagination(query, params) {
    if(params.limit) {
        let limit = +params.limit
        query.limit(+params.limit)
        if(params.page) {
            let page = +params.page
            let skip = (page - 1) * limit
            query.skip(skip)
        }
    }

    if(params.sory_by) {
        query.sort(params.sory_by)
    }
    return query
}

function formatRequest(req) {
    Object.keys(req).forEach(key => {
        if(typeof req[key] === "string") {
            req[key] = req[key].toLowerCase().trim()
        }
    })
    return req
}

module.exports = {
    modelTransform: modelTransform,
    pagination: pagination,
    formatRequest: formatRequest
}