const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: String,
})

const authorModel = mongoose.model("authors", authorSchema)
module.exports = authorModel

