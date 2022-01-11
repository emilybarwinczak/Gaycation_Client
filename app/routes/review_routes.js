const express = require('express')
// jsonwebtoken docs: https://github.com/auth0/node-jsonwebtoken
const crypto = require('crypto')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// bcrypt docs: https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')
const axios = require('axios')
const router = express.Router()
const Destination = require('../models/destination')


// INDEX --> GET
router.get('/reviews/:destinationId', (req, res, next) => {
    Destination.findById(req.params.destinationId)
        .then((destinations) => {
            return destinations.map((destination) => destination.toObject())
        })
        .then((destinations) => res.status(200).json({ destinations: destinations }))
        .catch(next)
})

// // SHOW --> GET
// router.get('/desination/reviews/:id', (req, res, next) => {
//     Destination.findById(req.params.id)
//     .then(handle404)
//     .then((destination) => res.status(200).json({ destination: destination.toObject() }))
//     .catch(next)
// })

// CREATE --> POST
router.post('/reviews/:destinationId', (req, res, next) => {
    // req.body.review.username = req.user.id
    Destination.findById(req.body.destination._id)
        .then(des => {
            des.review.push(req.body.reviews)
        })
        .then((review) => res.status(200).json({ review: review }))
    // Destination.create(req.body.destinationId)
    //     .then((destination) => {
    //         res.status(201).json({ destination: destination.toObject() })
    //     })
        .catch(next)
})

module.exports.router