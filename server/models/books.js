const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        lowercase: true,
    },
    author: String,
    authorId: String,
    page: Number,
    price: Number,
    description: String,
    fileUrl: String,
    categoryId: Number,
    qty: Number,
    cartQty: Number,
})

const BookModel = mongoose.model("book", BookSchema)
module.exports = BookModel

