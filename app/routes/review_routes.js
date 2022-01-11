const express = require('express')
// jsonwebtoken docs: https://github.com/auth0/node-jsonwebtoken
const crypto = require('crypto')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// bcrypt docs: https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
// pull in error types and the logic to handle them and set status codes
const router = express.Router()
const Destination = require('../models/destination')

// INDEX --> GET all comments from one destination
router.get('/reviews/:destinationId', (req, res, next) => {
    Destination.findById(req.params.destinationId)
        .then((destinations) => {
            // return destinations.map((destination) => destination.toObject())
            return destinations.reviews
        })
        .then((revs) => res.status(200).json(revs))
        .catch(next)
})

// SHOW --> GET one comment from one destination
router.get('/reviews/:destinationId/:reviewId', (req, res, next) => {
    Destination.findById(req.params.destinationId)
    .then((destination) => {
        return destination.reviews.id(req.params.reviewId)
    })
    .then((revs) => res.status(200).json(revs))
    .catch(next)
})

// CREATE --> POST
router.post('/reviews/:destinationId', (req, res, next) => {
    // req.body.review.username = req.user.id
    console.log('bla blah blah')
    Destination.findById(req.params.destinationId)
        .then(des => {
            console.log('is this the city?\n', des)
            des.reviews.push(req.body.review)
            des.save()
        })
        .then((review) => res.status(200).json({ review: review }))
        .catch(next)
})

module.exports = router