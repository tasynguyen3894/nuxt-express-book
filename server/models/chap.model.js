const mongoose = require('mongoose')
const Schema = mongoose.Schema
const chapSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    page: {
        type: Number,
        required: true
    },
    content_id: {
        type: Schema.Types.ObjectId,
        ref: 'Content'
    },
    published_at: {
        type: Date,
        required: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

chapSchema.method('transform', function() {
    var obj = this.toObject();
 
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v 
    return obj;
});

module.exports = chapSchema

