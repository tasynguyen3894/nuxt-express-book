const Story = require('../models/story.model')
const chapHelper = require('../helpers/chap.helper')

function index(req, res, next) {
    var storyId = req.params.storyId
    if(!storyId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    Story.findOne({_id: storyId}).populate({path: 'chaps.content_id'}).exec(function (err, doc) {
        if(err) {
            res.status(404)
            res.json({
                message: 'Story not found'
            })
            return false;
        }
        let chaps = chapHelper.modelTransform(doc.chaps)
        res.status(200)
        res.json({
            chaps: chaps
        })
        return true;
    })
}

async function create(req, res, next) {
    var storyId = req.params.storyId
    if(!storyId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    if(!req.body.name) {
        res.status(422)
        res.json({
            message: "name mustn't be empty"
        })
        return;
    }
    var { name, page } = req.body
    Story.findById(storyId, function (err, story) {
        let ExistsPage = story.chaps.filter(function (chap) {
            return chap.page == page
        }).length
        if(ExistsPage == 0) {
            story.chaps.push({
                name: name,
                page: page
            });
            story.save(function (err, doc) {
                if(err) {
                    res.status(422)
                    res.json({
                        message: err
                    })
                    return false
                }
                let chapCreated = doc.chaps.filter(function (chap) {
                    return chap.page = page
                })
                res.status(200)
                res.json({
                    chap: chapHelper.modelTransform(chapCreated[0]) 
                })
                return true
            })
            return;
        }
        res.status(422)
        res.json({
            message: 'duplicate'
        })
        return false
    })
    return
}

function edit(req, res, next) {
    var storyId = req.params.storyId
    var chapId = req.params.chapId
    if(!storyId || !chapId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    var { name, content_id, page } = req.body
    var chapData = {
        
    }
    if(name) {
        chapData["chaps.$.name"] = name
    }
    if(content_id) {
        chapData["chaps.$.content_id"] = content_id
    }

    if(page) {
        chapData["chaps.$.page"] = page
    }

    Story.findOneAndUpdate({_id: storyId, chaps: {$elemMatch: {_id: chapId}}}, {
        $set: chapData
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
        let chap = doc.transform().chaps.filter(function (chap) {
            return chap.id == chapId
        });
        res.status(200)
        res.json({
            chap: chapHelper.modelTransform(chap[0])
        })
        return true
    })
}

function publish(req, res, next) {
    var storyId = req.params.storyId
    var chapId = req.params.chapId
    if(!storyId || !chapId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }

    Story.findOneAndUpdate({_id: storyId, chaps: {$elemMatch: {_id: chapId}}}, {
        $set: {
            "chaps.$.published_at": new Date()
        }
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
        let chap = chapHelper.modelTransform(doc.chaps).filter(function (chap) {
            return chap.id == chapId
        });
        res.status(200)
        res.json({
            chap: chapHelper.modelTransform(chap[0])
        })
        return true
    })
}

function unpublish(req, res, next) {
    var storyId = req.params.storyId
    var chapId = req.params.chapId
    if(!storyId || !chapId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }

    Story.findOneAndUpdate({_id: storyId, chaps: {$elemMatch: {_id: chapId}}}, {
        $set: {
            "chaps.$.published_at": null
        }
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
        let chap = doc.transform().chaps.filter(function (chap) {
            return chap.id == chapId
        });
        res.status(200)
        res.json({
            chap: chapHelper.modelTransform(chap[0])
        })
        return true
    })
}

function remove(req, res, next) {
    var storyId = req.params.storyId
    var chapId = req.params.chapId
    if(!storyId || !chapId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    Story.updateOne({_id: storyId}, {$pull: {chaps: {_id: chapId}}}, function (err) {
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
    var storyId = req.params.storyId
    var chapId = req.params.chapId
    if(!storyId || !chapId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    Story.findOne({_id: storyId, chaps: {$elemMatch: {_id: chapId}}})
            .populate({path: 'chaps.content_id'})
            .exec(function (err, doc) {
                if(doc) {
                    let chaps = chapHelper.modelTransform(doc.chaps).filter(function (chap) {
                        return chap.id == chapId
                    });
                    
                    if(chaps.length > 0) {
                        let chap = chaps[0]
                        res.status(200)
                        res.json({
                            chap: chap
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
    remove: remove,
    unpublish: unpublish,
    publish: publish
}