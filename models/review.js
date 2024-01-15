const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewerName: {
        type: String,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    }
});

module.exports = reviewSchema;