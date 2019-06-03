const commonHelper = require('./common.helper')
const noteHelper = require('./note.helper')

function singleTransform(data) {
    data = commonHelper.modelTransform(data)
    if(typeof data.notes != "undefined") {
        data.notes = noteHelper.modelTransform(data.notes)
    }
    return data
}

function modelTransform(data) {
    if(typeof data == 'object') {
        if(data.constructor === Array || data.constructor.name == "CoreMongooseArray") {
            return data.map(function (item) {
                return singleTransform(item)
            })
        } else {
            return singleTransform(data)
        }
    }
    
    return data
}

function pagination(query, params) {
    return commonHelper.pagination(query, params)
}

module.exports = {
    modelTransform: modelTransform,
    pagination: pagination
}