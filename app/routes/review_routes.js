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
const router = require('./destination_routes')


// INDEX --> GET
router.get('/destination/reviews', (req, res, next) => {
    Destination.find()
        .then((destinations) => {
            return destinations.map((destination) => destination.toObject())
        })
        .then((destinations) => res.status(200).json({ destinations: destinations }))
        .catch(next)
})

// SHOW --> GET
router.get('/desination/reviews/:id', (req, res, next) => {
    Destination.findById(req.params.id)
    .then(handle404)
    .then((destination) => res.status(200).json({ destination: destination.toObject() }))
    .catch(next)
})

// CREATE --> POST
router.post('/reviews', (req, res, next) => {
    req.body.review.username = req.user.id

    Destination.create(req.body.destinationId)
        .then((destination) => {
            res.status(201).json({ destination: destination.toObject() })
        })
        .catch(next)
})
module.exports.router