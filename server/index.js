const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const BookModel = require('./models/books')
const AdminModel = require('./models/admin')
const ImageModel = require('./models/image')
const authorModel = require('./models/authors')
const multer = require('multer')
const path = require('path')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/authRoutes')
const bookRoute = require('./routes/bookRoutes')
const app = express()
const upload = multer()

require('dotenv').config()

app.use(cors({ origin: 'http://localhost:3000', credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'] }))
app.use(express.json())
app.use(cookieParser())
app.use(authRoute)
app.use(bookRoute)
app.use(express.static('public'))


mongoose.connect('mongodb://localhost:27017/monita-bookstore')


// const handleError = (error) => {
//     console.log(error.message, error.code);
//     const errorMsg = {
//         title: '',
//         price: '',
//         qty: '',
//         author: '',
//         categoryId: '',
//         description: '',
//         page: ''
//     }
//     if (error.message.includes('book validation failed')) {
//         Object.values(error.errors).forEach(({ properties }) => {
//             errorMsg[properties.path] = properties.message
//         })
//         return errorMsg
//     }
// }





// app.post('/authors', async (req, res) => {
//     const { name, books } = req.body
//     const author = await authorModel.create({ name, books })
//     res.json({ author: author })
// })
app.get('/get-authors', async (req, res) => {
    const authors = await authorModel.find()
    res.json(authors)
})
app.get('/authors', async (req, res) => {
    const { authorId } = req.query
    const authors = await BookModel.find({ authorId })
    res.json(authors)
})

app.get('/books', async (req, res) => {
    const { categoryId } = req.query
    console.log(categoryId);
    const books = await BookModel.find({ categoryId })
    res.json(books)
})
// app.get('/books/:id', (req, res) => {
//     BookModel.find({ _id: req.params.id })
//         .then(book => res.json(book))
//         .catch(err => res.json(err))
// })
// app.get('/best_sellers', (req, res) => {
//     BookModel.find({ categoryId: 1 })
//         .then(book => res.json(book))
//         .catch(err => res.json(err))
// })
// app.get('/new_arrivals', (req, res) => {
//     BookModel.find({ categoryId: 2 })
//         .then(book => res.json(book))
//         .catch(err => res.json(err))
// })

// app.post('/sign_in', (req, res) => {
//     const { email, password } = req.body
//     AdminModel.findOne({ email: email })
//         .then(admin => {
//             if (admin) {
//                 if (admin.password === password) {
//                     res.json("success")
//                 }
//                 else {
//                     res.json("the password is incorrect, pleas try again.")
//                 }
//             }
//             else {
//                 res.json("you are not our admin.")
//             }
//         })
//         .catch(err => res.json(err))
// })

app.listen(process.env.PORT || 5000)