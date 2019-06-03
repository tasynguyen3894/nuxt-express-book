const Content = require('../models/content.model')
const noteHelper = require('../helpers/note.helper')

function index(req, res, next) {
    var contentId = req.params.contentId
    if(!contentId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    // Story.findOne({}).populate({path: 'chaps.content'}).exec(function (err, story) {
    //     console.log(story.notes[0].content)
    // })
    Content.findOne({_id: contentId}).exec(function (err, doc) {
        if(err) {
            res.status(404)
            res.json({
                message: 'Content not found'
            })
            return false;
        }
        let notes = noteHelper.modelTransform(doc.notes)
        res.status(200)
        res.json({
            notes: notes
        })
        return true;
    })
}

function create(req, res, next) {
    var contentId = req.params.contentId
    if(!contentId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    if(!req.body.title || !req.body.text) {
        res.status(422)
        res.json({
            message: "title or text mustn't be empty"
        })
        return;
    }
    var { title, text } = req.body
    Content.updateOne({_id: contentId}, {
        $push: {
            notes: {
                title: title,
                text: text
            }
        }
    }, function (errUpdate, dataUpdate) {
        if(errUpdate) {
            res.status(422)
            res.json({
                message: 'system error'
            })
            return
        }
        res.status(200)
        res.json({
            message: 'done'
        })
        return true
    })
}

function edit(req, res, next) {
    var contentId = req.params.contentId
    var noteId = req.params.noteId
    if(!contentId || !noteId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    // if(!req.body.name) {
    //     res.status(422)
    //     res.json({
    //         message: "name mustn't be empty"
    //     })
    //     return;
    // }
    var { title, text } = req.body
    var noteData = {
        
    }
    if(title) {
        noteData["chaps.$.title"] = title
    }
    if(text) {
        noteData["chaps.$.text"] = text
    }
    Content.findOneAndUpdate({_id: contentId, notes: {$elemMatch: {_id: noteId}}}, {
        $set: noteData
    },
    {
        useFindAndModify: false,
        new: true
    },
    function (err, doc) {
        if(err) {
            res.status(422)
            res.json({
                message: err
            })
            return
        }
        let note = doc.transform().notes.filter(function (note) {
            return note.id == noteId
        });
        res.status(200)
        res.json({
            note: note[0]
        })
        return true
    })
}


function remove(req, res, next) {
    var contentId = req.params.contentId
    var noteId = req.params.noteId
    if(!contentId || !noteId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    Content.updateOne({_id: contentId}, {$pull: {notes: {_id: noteId}}}, function (err) {
        if(err) {
            res.status(404)
            res.json({
                message: 'chap not found'
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

function findById(req, res, next) {
    var contentId = req.params.contentId
    var noteId = req.params.noteId
    if(!contentId || !noteId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    Content.findOne({_id: contentId, notes: {$elemMatch: {_id: noteId}}})
            .populate({path: 'chaps.content_id'})
            .exec(function (err, doc) {
                if(doc) {
                    let notes = noteHelper.modelTransform(doc.notes).filter(function (note) {
                        return note.id == noteId
                    });
                    
                    if(chaps.length > 0) {
                        let note = notes[0]
                        res.status(200)
                        res.json({
                            note: notes[0]
                        })
                        return true
                    }
                    
                }
                res.status(404)
                res.json({
                    message: 'story not found'
                })
                return false
            })
}

module.exports = {
    index: index,
    findById: findById,
    create: create,
    edit: edit,
    remove: remove
}