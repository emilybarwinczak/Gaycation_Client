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
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireToken = passport.authenticate('bearer', { session: false })

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

// POST --> Create a review for one destination
router.post('/reviews/:destinationId', (req, res, next) => {
    Destination.findById(req.params.destinationId)
        .then(des => {
            // console.log('is this the city?\n', des)
            des.reviews.push(req.body.review)
            des.save()
        })
        .then((review) => res.status(200).json({ review: review }))
        .catch(next)
})

// DELETE --> remove one review from one destination
router.delete('/reviews/:destinationId/:reviewId', (req, res, next) => {
    Destination.findById(req.params.destinationId)
        .then(des => {
            let review = des.reviews.find(rev => {
                return rev._id.toString() === req.params.reviewId.toString()
            })
            des.reviews.splice(des.reviews.indexOf(review), 1)
            return des.save()
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
})

// PATCH --> EDIT one review
router.patch('/reviews/:destinationId/:reviewId', (req, res, next) => {
    Destination.findByIdAndUpdate(req.params.destinationId)
        .then(handle404)
        .then((des) => {
            const review = des.reviews.id(req.params.reviewId)
            // console.log('this is review: ' ,review)
            // console.log('this is des: ', des)   
            review.set(req.body.review)
            return des.save()
        })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router