const Users = require('../model/User');

module.exports = async (req, res, next) => {
    let cart = {
        items: [],
        price: 0
    };

    try {
        const user = res.locals.user;
        const newCart = await Users.findById(user._id).populate("cart.items.product");

        newCart ? (cart = newCart.cart) : null;
    } catch (error) {
        console.log('Error getCart middleware, user not authorized!');
    }

    res.locals.cart = cart
    res.locals.sum = cart.items.length
    next();
}