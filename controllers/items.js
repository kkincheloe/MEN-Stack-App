/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')

// Index Route GET
router.get('/', function (req, res) {
    db.Item.find({})
        .then(items => {
            res.render('item-index', {
                items: items
            })
        })
})

// Create Route POST
router.post('/', (req, res) => {
    db.Item.create(req.body)
        .then(item => res.redirect('/items/' + item._id))
})

// New Route GET
router.get('/new', (req, res) => {
    res.render('items/new-review')
})

// Show Route GET
router.get('/:id', function (req, res) {
     db.Item.findById(req.params.id)
        .then(item => res.render('item-details', { item: item }))
         .catch(() => res.render('404: Error Loading This Page'))
   
})

// Update Route PUT
router.put('/:id', (req, res) => {
    db.Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(item => res.redirect('/items/' + item._id))
})

router.get('/:id/buy', (req, res) => {
    db.Product.updateOne(
        {'_id': req.params.id},
        { $inc: {quantity: -1}}
    ).then( () => 
        res.redirect('/products/' + req.params.id))
    })

// Destroy Route DELETE
router.delete('/:id', (req, res) => {
    db.Item.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('items'))
})

// Edit Route GET
router.get('/:id/edit', (req, res) => {
    db.Item.findById(req.params.id)
        .then(item => res.render('items/edit-form', { item: item }))
})

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router