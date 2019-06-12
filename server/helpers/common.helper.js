const paramKey = {
    pagination: ['limit', 'page'],
    relation: 'relation'
}

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
    let reqFormated = {
        params: {},
        pagination: {},
        relation: []
    }
    Object.keys(req).forEach(key => {
        if(typeof req[key] === "string") {
            req[key] = req[key].toLowerCase().trim()
        }
        if(paramKey.pagination.indexOf(key) > -1) {
            reqFormated.pagination[key] = req[key]
        } else if(paramKey.relation == key) {
            reqFormated.relation = req[key].split(",")
        } else {
            reqFormated.params[key] = req[key]
        }
    })
    return reqFormated
}

module.exports = {
    modelTransform: modelTransform,
    pagination: pagination,
    formatRequest: formatRequest
}