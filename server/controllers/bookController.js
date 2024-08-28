const BookModel = require("../models/books")
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const authorModel = require("../models/authors")
const upload = multer()

const handleError = (error) => {
    console.log(error.message, error.code);
    const errorMsg = {
        title: '',
        price: '',
        qty: '',
        author: '',
        categoryId: '',
        description: '',
        page: ''
    }
    if (error.message.includes('book validation failed')) {
        Object.values(error.errors).forEach(({ properties }) => {
            errorMsg[properties.path] = properties.message
        })
        return errorMsg
    }
}

module.exports.get_books = async (req, res) => {
    try {
        const books = await BookModel.find();
        res.json(books);
    } catch (error) {
        console.log(error);
    }
}
// module.exports.get_authors = async (req, res) => {
//     try {
//         const authors = await authorModel.find();
//         res.json(authors);
//     } catch (error) {
//         console.log(error);
//     }
// }

// /

// module.exports.authors = async (req, res) => {
//     const { authorId } = req.query
//     const authors = await BookModel.find({ authorId })
//     res.json(authors)
// }

module.exports.upload_cover = (req, res) => {
    const filePath = Date.now() + '-' + req.file.originalname
    fs.writeFile(path.join('public', filePath), req.file.buffer, (error) => {
        if (error) {
            console.log(error);
        }
        console.log('saved!');
    })
    res.json({ message: filePath })
};

module.exports.check_book = async (req, res) => {
    const { title } = req.body
    const existing = await BookModel.findOne({ title })
    if (existing) {
        res.status(201).json({ id: existing._id })
    } else {
        res.status(400).json({ error: 'does not have in database' })
    }
}

module.exports.update_book = async (req, res) => {
    const { id, qty } = req.body
    const update = await BookModel.findByIdAndUpdate(id, { $inc: { qty: qty } })
    res.status(201).json({ update })
}

module.exports.create_book = async (req, res) => {
    try {
        const book = await BookModel.create(req.body)
        res.status(201).json({ book: book })
    }
    catch (err) {
        const error = handleError(err)
        res.status(400).json({ error: error })
    }
}

//sort-books

module.exports.sort_book_byAuthor = (req, res) => {
    const { authorId } = req.query
    BookModel.findOne({ authorId })
    res.json(authorId)
}

module.exports.create_author = async (req, res) => {
    const { name } = req.body
    const author = await authorModel.create({ name })
    res.json({ author: author })
}

module.exports.sort_book_byCategory = async (req, res) => {
    const { categoryId } = req.query
    console.log(categoryId);
    const books = await BookModel.findOne({ categoryId })
    res.json(books)
}

module.exports.get_single_book = (req, res) => {
    BookModel.find({ _id: req.params.id })
        .then(book => res.json(book))
        .catch(err => res.json(err))
}

module.exports.get_bestSeller = (req, res) => {
    BookModel.find({ categoryId: 1 })
        .then(book => res.json(book))
        .catch(err => res.json(err))
}

module.exports.get_newArrival = (req, res) => {
    BookModel.find({ categoryId: 2 })
        .then(book => res.json(book))
        .catch(err => res.json(err))
}