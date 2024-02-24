const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const BookModel = require('./models/books')
const AdminModel = require('./models/admin')
const ImageModel = require('./models/image')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const app = express()
const upload = multer()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/monita-bookstore')

app.post('/upload-file', upload.single("file"), (req, res) => {
    const filePath = Date.now() + '-' + req.file.originalname
    fs.writeFile(path.join('public', filePath), req.file.buffer, (error) => {
        if (error) {
            console.log(error);
        }
        console.log('saved!');
    })
    res.json({ message: filePath })
});

app.post('/create-book', upload.single("file"), async (req, res) => {
    try {
        const book = new BookModel(req.body);
        const response = await book.save();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
})

app.get('/get-books', async (req, res) => {
    try {
        const books = await BookModel.find();
        res.json(books);
    } catch (error) {
        console.log(error);
    }
})

app.get('/books', (req, res) => {
    BookModel.find()
        .then(book => res.json(book))
        .catch(err => res.json(err))
})
app.get('/books/:id', (req, res) => {
    BookModel.find({ _id: req.params.id })
        .then(book => res.json(book))
        .catch(err => res.json(err))
})
app.get('/best_sellers', (req, res) => {
    BookModel.find({ categoryId: 1 })
        .then(book => res.json(book))
        .catch(err => res.json(err))
})
app.get('/new_arrivals', (req, res) => {
    BookModel.find({ categoryId: 2 })
        .then(book => res.json(book))
        .catch(err => res.json(err))
})

app.post('/sign_in', (req, res) => {
    const { email, password } = req.body
    AdminModel.findOne({ email: email })
        .then(admin => {
            if (admin) {
                if (admin.password === password) {
                    res.json("success")
                }
                else {
                    res.json("the password is incorrect, pleas try again.")
                }
            }
            else {
                res.json("you are not our admin.")
            }
        })
        .catch(err => res.json(err))
})

app.listen(3001)