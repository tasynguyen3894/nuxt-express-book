const mongoose = require('mongoose')
const chapSchema = require('./chap.model')
const arrayUniquePlugin = require('mongoose-unique-array');
mongoose.connect(process.env.mongodb_uri);
const db = mongoose.connection;
const Schema = mongoose.Schema

const storySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tiny_info: {
        type: String,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    chaps: [
        chapSchema
    ]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false
})


storySchema.pre('remove', function (next) {
    var story = this;
    var currentDate = new Date();
    story.deleted_at= currentDate;
    next();
})

storySchema.method('transform', function() {
    var obj = this.toObject();
 
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v
    if(obj.chaps) {
        obj.chaps = obj.chaps.map(function (chap) {
            chap.id = chap._id;
            delete chap._id;
            return chap
        })
    }
 
    return obj;
});
// storySchema.plugin(arrayUniquePlugin)
const Story = db.model('Story', storySchema)
module.exports = Story

