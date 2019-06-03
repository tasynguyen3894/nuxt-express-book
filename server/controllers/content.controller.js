const Content = require('../models/content.model')
const contentHelper = require('../helpers/content.helper')

function create(req, res, next) {
    var { text, title } = req.body
    
    var contentModel = new Content({
        text: text,
        title: title,
        notes: [
        ]
    });
    contentModel.save(function (err, content) {
        if(err) {
            res.status(422)
            res.json({
                message: 'system error'
            })
            return
        }
        res.status(200)
        res.json({
            content: contentHelper.modelTransform(content) 
        })
    })
    
    return;
}

function findById(req, res, next) {
    var contentId = req.params.contentId
    if(!contentId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    Content.findById(contentId, function (err, doc) {
        if(doc) {
            res.status(200)
            res.json({
                content: contentHelper.modelTransform(doc)
            })
            return true
        }
        res.status(404)
        res.json({
            message: 'content not found'
        })
        return false
    })
}

function remove(req, res, next) {
    var contentId = req.params.contentId
    if(!contentId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    Content.deleteOne({_id: contentId}, function (err) {
        if(err) {
            res.status(404)
            res.json({
                message: 'content not found'
            })
            return false
        }
        res.status(200)
        res.json({
            message: 'done'
        })
        return true
    })
}

function index(req, res, next) {
    Content.find({}, function (err, data) {
        res.status(200)
        res.json({
            contents: contentHelper.modelTransform(data)
        })
        return true
    })
}

function edit(req, res, next) {
    var contentId = req.params.contentId
    if(!contentId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    var { title, text } = req.body

    let contentData = {}
    if(title) {
        contentData['title'] = title
    }

    if(text) {
        contentData['text'] = text
    }

    Content.findByIdAndUpdate(contentId, contentData, {new: true}, function (errUpdate, dataUpdate) {
        if(errUpdate) {
            res.status(422)
            res.json({
                message: 'system error'
            })
            return
        }
        res.status(200)
        res.json({
            content: dataUpdate.transform()
        })
        return true
    })
}

module.exports = {
    create: create,
    edit: edit,
    findById: findById,
    remove: remove,
    index: index
}