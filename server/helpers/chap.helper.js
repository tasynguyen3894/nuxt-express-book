const commonHelper = require('./common.helper')
const contentHelper = require('./content.helper')

function singleTransform(data) {
    data = commonHelper.modelTransform(data)
    if(typeof data.content_id == 'object' && typeof data.content_id._bsontype == "undefined") {
        data.content = contentHelper.modelTransform(data.content_id)
        delete data.content_id
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

module.exports = {
    modelTransform: modelTransform
}