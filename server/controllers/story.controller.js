const Story = require('../models/story.model')
const storyHelper = require('../helpers/story.helper')
const storyRepository = require('../repository/story.repository')

function create(req, res, next) {
    var { name, tiny_info, category_id } = req.body

    var story = new Story({
        name: name,
        tiny_info: tiny_info,
        category_id: category_id,
        chaps: [
        ]
    });
    story.save(function (err, story) {
        if(err) {
            res.status(422)
            res.json({
                message: 'system error'
            })
            return
        }
        res.status(200)
        res.json({
            story: story.transform() 
        })
    })
    
    return;
}

function findById(req, res, next) {
    var storyId = req.params.storyId
    if(!storyId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    Story.findById(storyId).populate('category_id').populate('chaps.content_id').exec(function (err, doc) {
        if(doc) {
            res.status(200)
            res.json({
                story: storyHelper.modelTransform(doc)
            })
            return true
        }
        res.status(404)
        res.json({
            message: 'story not found'
        })
        return false
    })
}

function remove(req, res, next) {
    var storyId = req.params.storyId
    if(!storyId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    Story.deleteOne({_id: storyId}, function (err) {
        if(err) {
            res.status(404)
            res.json({
                message: 'story not found'
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

function findGuess(req, res, next) {
    let storyQuery = storyRepository.find(req.query, 1)
    storyQuery.exec(function (err, data) {
        if(err) {
            console.log(err)
            res.status(404)
            res.json({
                message: err
            })
            return false
        }
        res.status(200)
        res.json({
            stories: storyHelper.modelTransform(data)
        })
        return true
    })
}

function findAdmin(req, res, next) {
    let storyQuery = storyRepository.find(req.query, 1)
    storyQuery.exec(function (err, data) {
        if(err) {
            res.status(404)
            res.json({
                message: 'error'
            })
            return false
        }
        res.status(200)
        res.json({
            stories: storyHelper.modelTransform(data)
        })
        return true
    })
}

function edit(req, res, next) {
    var storyId = req.params.storyId
    if(!storyId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }

    var { name, tiny_info, category_id } = req.body
    let storyData = {}
    if(name) {
        storyData['name'] = name
    }

    if(tiny_info) {
        storyData['tiny_info'] = tiny_info
    }

    if(category_id) {
        storyData['category_id'] = category_id
    }

    Story.findByIdAndUpdate(storyId, storyData, {new: true}, function (errUpdate, dataUpdate) {
        if(errUpdate) {
            res.status(422)
            res.json({
                message: 'system error'
            })
            return
        }
        res.status(200)
        res.json({
            message: dataUpdate
        })
        return true
    })
}

module.exports = {
    create: create,
    edit: edit,
    findById: findById,
    remove: remove,
    index: findGuess
}