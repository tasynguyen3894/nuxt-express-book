const storyHelper = require('../helpers/story.helper')
const Story = require('../models/story.model')
const relateList = ["category_id", "chaps.content_id"]

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
        if(relateList.indexOf(relate) > -1) {
            query.populate(relate)
        }
    })
    return query
}

function find(params, options) {
    params = storyHelper.formatRequest(params)
    let storyModel = Story.find(filterSearch(params));
    storyModel = relationship(storyModel, ["category_id", "chaps.content_id"])
    storyModel = storyHelper.pagination(storyModel, params)
    return storyModel;
}


module.exports = {
    find: find
}