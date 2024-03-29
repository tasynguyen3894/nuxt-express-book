const mongoose = require('mongoose')
mongoose.connect(process.env.mongodb_uri);
const noteSchema = require('./note.model')
const db = mongoose.connection;
const Schema = mongoose.Schema
const contentSchema = new Schema({
    text: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    notes: [
        noteSchema
    ]
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

contentSchema.method('transform', function () {
    let obj = this.toObject();
    obj.id = obj._id
    delete obj._id
    delete obj.__v
    return obj
})

const Content = db.model('Content', contentSchema)
module.exports = Content