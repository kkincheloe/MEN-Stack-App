/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')



// Index Route GET
router.get('/', (req, res) => {
    db.Item.find(
        {},
        { reviews: true, _id: false }
    )
        .then(items => { 
            const flatList = []
            for (let item of items) {
                flatList.push(...item.reviews)
            }
            res.render('reviews/review-index', { reviews: flatList })
        })
});

// Show Route GET 
router.get('/:id', (req, res) => {
    db.Item.findOne(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
    )
        .then(item => {
            res.render('reviews/review-details', { review: item.reviews[0] })
        })
});

// Destroy Route DELETE
router.delete('/:id', (req, res) => {
    db.Item.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
        .then(() => res.redirect('/reviews'))
});

// New Route GET
router.get('/new/:itemId', async (req, res) => {
    const item = await db.Item.findById(req.params.itemId)
    res.render('reviews/new-review', { item: item })
})

// Create Route POST
router.post('/create/:itemId', (req, res) => {
    db.Item.findByIdAndUpdate(
        req.params.itemId,
        { $push: { reviews: req.body } },
        { new: true }
    )
        .then(() => res.redirect('/reviews'))
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router