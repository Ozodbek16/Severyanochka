const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/product-img')
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = moment().format('DDMMYYYY-hhmmss')

        cb(null, uniqueSuffix + '-' + file.originalname)
    }

})

const allowedTypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/jfif']

function fileFilter(req, file, cb) {

    // The function should call cb with a boolean
    // to indicate if the file should be accepted
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
        // You can always pass an error if something goes wrong:
        cb(new Error('I don\'t have a clue!'))
    }
}


module.exports = multer({
    storage,
    fileFilter
})