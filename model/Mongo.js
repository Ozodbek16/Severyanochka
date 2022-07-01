const { Schema, model } = require('mongoose')
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    }, price: {
        type: Number,
        required: true
    }, discount: {
        type: String,
        required: true
    }, star: {
        type: Number,
        required: true
    }, brand: {
        type: String,
    }, country: {
        type: String,
        required: true
    }, catalog: {
        type: String,
        required: true
    }, weight: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        default: '/img/default-image.jpg'
    }

})
module.exports = model('products', productSchema)