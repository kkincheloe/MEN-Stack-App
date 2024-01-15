// Require the Mongoose package
const mongoose = require('mongoose');
const reviewSchema = require('./review.js')

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    photo: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, min: 0, required: true },
    isFeatured: { type: Boolean, default: true },

    reviews: [reviewSchema]
});

module.exports = mongoose.model('Item', itemSchema);