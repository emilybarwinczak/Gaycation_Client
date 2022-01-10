require('dotenv').config()
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
const requireToken = passport.authenticate('bearer', { session: false })

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError
const bcryptSaltRounds = 10

const Destination = require('../models/destination')
const User = require('../models/user')
const Review = require('../models/review')

const router = express.Router()

// API call to GET one destination based on city/country name
router.get('/destinations/:destinationname', (req, res, next) => {
    const key_value = `?q=${req.params.destinationname}`
    axios.get(`https://api.roadgoat.com/api/v2/destinations/auto_complete${key_value}`, {
        headers: { 
            'Authorization': `Basic ${process.env.AUTH_KEY}`
          }
    })
    .then(resp => {
        console.log('Destination:\n', resp.data)
        res.json(resp.data)
    })
    .catch(next)
})

router.get('/destinations', (req, res, next) => {
    Destination.find({})
    .then(des => {
        res.json(des)
    })
    .catch(next)
})

// POST create a destination into database
router.post('/destinations', (req, res, next) => {
    Destination.findOne({
        roadGoatId: req.body.roadGoatId
    }).populate('reviews')
    .then(des => {
        if (des) {
            des.users.push(req.user._id)
            return des.save()
        } else {
            return Destination.create({
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    reviews: [],
                    lgbtRating: req.body.lgbtRating,
                    image_url: req.body.image_url,
                    description: req.body.description,
                    business: [],
                    roadGoatId: req.body.roadGoatId
            })
        }
    })
    .then(data => res.status(200).json(data))
    .catch(next)
})


module.exports = router