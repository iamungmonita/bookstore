const { Router } = require('express')
const authController = require('../controllers/authController')
const router = Router()

//admin
router.post('/auth/admin_register', authController.admin_register)
router.post('/auth/admin_login', authController.admin_login)
router.get('/auth/admin_cookie', authController.admin_cookie)
router.get('/auth/admin_logout', authController.admin_logout)

//membership



module.exports = router