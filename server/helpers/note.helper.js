const commonHelper = require('./common.helper')

function singleTransform(data) {
    data = commonHelper.modelTransform(data)
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