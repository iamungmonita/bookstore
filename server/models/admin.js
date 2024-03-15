const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please enter a username'],
        trim: true,
        lowercase: true,
        minLength: [6, 'minimum username is 6 character']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'please enter an email'],
        lowercase: true,
        trim: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        trim: true,
        minLength: [6, 'minimum password length is 6 characters']
    }
})

AdminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    console.log(this);
    next()
})
AdminSchema.post('save', function (doc, next) {
    console.log(doc);
    next()
})


const AdminModel = mongoose.model("admins", AdminSchema)
module.exports = AdminModel

