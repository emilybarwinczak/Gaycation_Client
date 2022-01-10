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

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError
const bcryptSaltRounds = 10

const Destination = require('../models/destination')
const User = require('../models/user')
const Review = require('../models/review')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
// const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const auth_key = process.env.AUTH_KEY


// API call to get all destinations
router.get('/destination', (req, res, next) => {
    axios.get(`https://api.roadgoat.com/api/v2/destinations/new-york-ny-usa`, {
        headers: { 
            'Authorization': `Basic ${auth_key}`
          }
    })
    .then(resp => {
        console.log('Destination:\n', resp.data)
        res.json(resp.data)
    })
    .catch(next)
})

module.exports = router