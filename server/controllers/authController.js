const { compare } = require('bcrypt')
const AdminModel = require('../models/admin')
const jwt = require('jsonwebtoken')

const age = 3 * 24 * 60 * 60

const createToken = (id, username) => {
    return jwt.sign({ id, username }, 'hello', { expiresIn: age })
}

const handleError = (err) => {
    console.log(err.message, err.code);
    const error = { username: '', email: '', password: '' }
    if (err.code === 11000) {
        error.email = 'this email is already registered'
        return error
    }
    if (err.message.includes('admins validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message
        })
        return error
    }

}

module.exports.admin_register = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With,content-type",
        );
        res.setHeader("Access-Control-Allow-Credentials", true);
        const { username, email, password } = req.body
        const admin = await AdminModel.create({ username, email, password })
        const token = createToken(admin._id, admin.username)
        res.cookie('admin', token, { maxAge: age * 1000, httpOnly: true })
        res.status(200).json({
            admin: {
                username: admin.username,
                id: admin._id,
                token: token
            }
        })
    }
    catch (err) {
        const error = handleError(err)
        res.status(400).json({ error: error })
    }
}

module.exports.admin_login = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await AdminModel.findOne({ email })
        if (admin) {
            if (await compare(password, admin.password)) {
                const token = createToken(admin._id, admin.username)
                res.cookie('admin', token, { maxAge: age * 1000, httpOnly: true })
                res.status(201).json({ admin: { username: admin.username, token: token } })
            }
            else {
                res.status(400).json({ password: 'incorrect password' })
            }
        }
        else {
            res.status(400).json({ email: 'this admin does not exist.' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}
module.exports.admin_logout = async (req, res) => {
    res.cookie('admin', '', { maxAge: 1 })
    res.send('removed')
}

module.exports.admin_cookie = async (req, res) => {
    const cookie = req.cookies.admin
    if (cookie) {
        jwt.verify(cookie, 'hello', (err, decodedToken) => {
            if (err) {
                res.status(400).json({ error: err.message })
            } else {
                res.status(201).json({ decodedToken: decodedToken })
            }
        })
    }
    else {
        res.status(400).json({ error: 'token does not exist' })
    }
}