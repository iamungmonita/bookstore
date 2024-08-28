const { Router } = require('express')
const bookController = require('../controllers/bookController')
const router = Router()
const multer = require('multer')
const upload = multer()

//author
router.post('/authors', bookController.create_author)
// router.get('/get-authors', bookController.get_authors)
// router.get('/authors', bookController.authors)

//create book
router.get('/get-books', bookController.get_books)
router.post('/upload-cover', upload.single("file"), bookController.upload_cover)
router.post('/check-book', bookController.check_book)
router.put('/update-book', bookController.update_book)
router.post('/create-book', upload.single("file"), bookController.create_book)

//filter books

router.get('/books/:id', bookController.get_single_book)
router.get('/sortBy', bookController.sort_book_byAuthor)
// router.get('/books/sortBy', bookController.sort_book_byCategory)
router.get('/best_sellers', bookController.get_bestSeller)
router.get('/new_arrivals', bookController.get_newArrival)


module.exports = router