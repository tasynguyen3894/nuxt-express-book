const CategoryModel = require('../models/category.model')
const categoryHelper = require('../helpers/category.helper')

function create(req, res, next) {
    var { name, alias } = req.body
    
    var Category = new CategoryModel({
        name: name,
        alias: alias
    });
    Category.save(function (err, category) {
        if(err) {
            res.status(422)
            res.json({
                message: 'system error'
            })
            return
        }
        res.status(200)
        res.json({
            category: categoryHelper.modelTransform(category)
        })
    })
    
    return;
}

function findById(req, res, next) {
    var categoryId = req.params.categoryId
    if(!categoryId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    CategoryModel.findById(categoryId, function (err, doc) {
        if(doc) {
            res.status(200)
            res.json({
                category: categoryHelper.modelTransform(doc)
            })
            return true
        }
        res.status(404)
        res.json({
            message: 'category not found'
        })
        return false
    })
}

function remove(req, res, next) {
    var categoryId = req.params.categoryId
    if(!categoryId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    CategoryModel.deleteOne({_id: categoryId}, function (err) {
        if(err) {
            res.status(404)
            res.json({
                message: 'category not found'
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
    CategoryModel.find({}, function (err, data) {
        data = data.map(function (category) {
            return category.transform()
        })
        res.status(200)
        res.json({
            categories: data
        })
        return true
    })
}

function edit(req, res, next) {
    var categoryId = req.params.categoryId
    if(!categoryId) {
        res.status(400)
        res.json({
            message: 'Bad request'
        })
        return false;
    }
    var { name, alias } = req.body

    let categoryData = {}
    if(name) {
        categoryData['name'] = name
    }

    if(alias) {
        categoryData['alias'] = alias
    }

    CategoryModel.findByIdAndUpdate(categoryId, categoryData, {new: true}, function (errUpdate, dataUpdate) {
        if(errUpdate) {
            res.status(422)
            res.json({
                message: 'system error'
            })
            return
        }
        res.status(200)
        res.json({
            category: dataUpdate.transform()
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