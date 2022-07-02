const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    surname: {
        type: String,
    },
    img: {
        type: String,
        default: '/img/default-img-ava.jpg'
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    }
})

module.exports = model('admin', adminSchema)