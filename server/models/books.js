const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    authorId: Number,
    page: Number,
    price: Number,
    description: String,
    fileUrl: String,

})

const BookModel = mongoose.model("books", BookSchema)
module.exports = BookModel

