const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'title is required']
    },
    author: {
        type: String,
        required: [true, 'author is required']
    },
    authorId: String,
    page: {
        type: Number,
        required: [true, 'page is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    fileUrl: String,
    categoryId: {
        type: String,
        required: [true, 'categoryId is required']
    },
    qty: {
        type: Number,
        required: [true, 'qty is required']
    },
    cartQty: Number,
})

const BookModel = mongoose.model("book", BookSchema)
module.exports = BookModel

