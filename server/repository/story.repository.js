const storyHelper = require('../helpers/story.helper')
const Story = require('../models/story.model')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const relateList = {
    category: "category_id",
    chap_content: "chaps.content_id"
}

function filterSearch(params, options) {
    let filter = {}
    let filterParams = [
        {
            key: "id",
            keyDB: "_id",
            compare: "equal",
            type: ObjectId
        },
        {
            key: "category_id",
            keyDB: "category_id",
            compare: "equal",
            type: ObjectId
        },
        {
            key: "name",
            keyDB: "name",
            compare: "like",
            type: String
        },
        {
            key: "tiny_info",
            keyDB: "tiny_info",
            compare: "like",
            type: String
        },
        {
            key: "published",
            keyDB: "published_at",
            compare: "is_null",
            type: Boolean
        }
    ];
    filterParams.forEach(param => {
        if(typeof params[param.key] !== "undefined") {
            switch (param.compare) {
                case "equal":
                    filter[param.keyDB] = param.type(params[param.key])
                    break;
                case "like":
                    filter[param.keyDB] = {
                        $regex: param.type(params[param.key]),
                        $options: 'i'
                    }
                    break;
                case "is_null":
                    if(param.type(params[param.key]) == true) {
                        filter[param.keyDB] = {
                            $ne: null
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    });
    filter = storyHelper.policyFilter(params, options, filter)
    // let aggregate = [{
    //     $match: filter
    // }]
    if(typeof options.role === 'undefined' || options.role != 'admin') {
        // aggregate.push({
        //     $addFields: {
        //         chaps: {
        //             $filter: {
        //                 input: "$chaps",
        //                 as: "chap",
        //                 cond: {
        //                     $ne: [{$type: "$$chap.published_at"}, "missing"]
        //                 }
        //             }
        //         }
        //     }
        // }, { $unwind :'$chaps'})
    }
    // aggregate.push({ $unwind: {
    //     path: '$chaps',
    //     preserveNullAndEmptyArrays: true
    // }})
    // aggregate.push({ 
    //     $lookup: {
    //         from: 'contents',
    //         localField: 'chaps.content_id',
    //         foreignField: '_id',
    //         as: 'chaps.content'
    //     }
    // })
    // aggregate.push({ 
    //     $unwind: {
    //         path: "$chaps.content",
    //         "preserveNullAndEmptyArrays": true
    //     }
    // })
    // aggregate.push({ 
    //     $unwind: {
    //         path: "$chaps",
    //         "preserveNullAndEmptyArrays": true
    //     }
    // })
    // aggregate.push({
    //     $group: {
    //         _id: "$_id",
    //         chaps: {
    //             $push: {
    //                 $cond: [
    //                     {
    //                         $ne: ["$chaps.id", null]    
    //                     },
    //                     "$chaps",
    //                     null
    //                 ]
    //             }
    //         }
    //     }
    // })
    
    return filter
}

function relationship(query, relates) {
    relates.forEach(relate => {
        if(relateList[relate]) {
            query.populate(relateList[relate])
        }
    })
    return query
}

function find(params, options) {
    params = storyHelper.formatRequest(params)
    let storyModel = Story.find(filterSearch(params.params, options));
    storyModel = relationship(storyModel, params.relation)
    storyModel = storyHelper.pagination(storyModel, params.pagination)
    return storyModel;
}

function findById(id, params, options) {
    params.id = id
    params = storyHelper.formatRequest(params)
    let storyModel = Story.find(filterSearch(params.params, options));
    storyModel = relationship(storyModel, params.relation)
    return storyModel;
}


module.exports = {
    find: find,
    findById: findById
}