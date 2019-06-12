const storyHelper = require('../helpers/story.helper')
const Story = require('../models/story.model')
const relateList = {
    category: "category_id",
    chap_content: "chaps.content_id"
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
                        $regex: params[param.key],
                        $options: 'i'
                    }
                    break;
                default:
                    break;
            }
        }
    });
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
    let storyModel = Story.find(filterSearch(params.params));
    storyModel = relationship(storyModel, params.relation)
    storyModel = storyHelper.pagination(storyModel, params.pagination)
    return storyModel;
}

function findById(id, params, options) {
    params = storyHelper.formatRequest(params)
    let storyModel = Story.findById(id);
    storyModel = relationship(storyModel, params.relation)
    return storyModel;
}


module.exports = {
    find: find,
    findById: findById
}