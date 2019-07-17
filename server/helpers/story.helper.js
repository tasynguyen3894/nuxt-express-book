const commonHelper = require('./common.helper')
const categoryHelper = require('./category.helper')
const chapHelper = require('./chap.helper')
const userHelper = require('./user.helper')

function singleTransform(data, options) {
    data = commonHelper.modelTransform(data)
    if(typeof data.category_id == 'object' && typeof data.category_id._bsontype == "undefined") {
        data.category = categoryHelper.modelTransform(data.category_id)
        delete data.category_id
    }
    if(typeof data.user_id == 'object' && typeof data.user_id._bsontype == "undefined") {
        data.user = userHelper.modelTransform(data.user_id)
        delete data.user_id
    }
    if(typeof data.chaps != "undefined") {
        if(typeof options.role === 'undefined' || options.role != 'admin') {
            data.chaps = data.chaps.filter(function (chap) {
                return chap.published_at
            })
        }
        data.chaps = chapHelper.modelTransform(data.chaps)
    }
    return data
}

function modelTransform(data, options) {
    
    if(typeof data == 'object') {
        if(data.constructor === Array) {
            return data.map(function (item) {
                return singleTransform(item, options)
            })
        } else {
            return singleTransform(data, options)
        }
    }
    
    return data
}

function formatRequest(params) {
    return commonHelper.formatRequest(params)
}

function policyFilter(params, options, filter) {
    filter = commonHelper.policyFilter(options, filter);
    return filter
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
    formatRequest: formatRequest,
    policyFilter: policyFilter
}