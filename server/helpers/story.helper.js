const commonHelper = require('./common.helper')
const categoryHelper = require('./category.helper')
const chapHelper = require('./chap.helper')

function singleTransform(data) {
    data = commonHelper.modelTransform(data)
    if(typeof data.category_id == 'object' && typeof data.category_id._bsontype == "undefined") {
        data.category = categoryHelper.modelTransform(data.category_id)
        delete data.category_id
    }
    if(typeof data.chaps != "undefined") {
        data.chaps = chapHelper.modelTransform(data.chaps)
    }
    return data
}

function modelTransform(data) {
    
    if(typeof data == 'object') {
        if(data.constructor === Array) {
            return data.map(function (item) {
                return singleTransform(item)
            })
        } else {
            return singleTransform(data)
        }
    }
    
    return data
}

function formatRequest(params) {
    return commonHelper.formatRequest(params)
}

function filterSearch(params) {
    let filter = {}
    let filterParams = [
        {
            key: "category_id",
            compare: "equal"
        },
        {
            key: "name",
            compare: "like"
        },
        {
            key: "tiny_info",
            compare: "like"
        }
    ];
    filterParams.forEach(param => {
        if(typeof params[param.key] !== "undefined") {
            switch (param.compare) {
                case "equal":
                    filter[param.key] = params[param.key]
                    break;
                case "like":
                    filter[param.key] = {
                        $regex: '.*' + params[param.key] + '.*'
                    }
                    break;
                default:
                    break;
            }
        }
    });
    return filter
}

function pagination(query, params) {
    return commonHelper.pagination(query, params)
}

module.exports = {
    modelTransform: modelTransform,
    filterSearch: filterSearch,
    pagination: pagination,
    formatRequest: formatRequest
}