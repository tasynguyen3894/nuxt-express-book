const mongoose = require('mongoose')
mongoose.connect(process.env.mongodb_uri);
const db = mongoose.connection;
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    alias: {
        type: String,
        require: true,
        unique: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

categorySchema.method('transform', function () {
    let obj = this.toObject();
    obj.id = obj._id
    delete obj._id
    delete obj.__v
    return obj
})

const Category = db.model('Category', categorySchema)
module.exports = Category