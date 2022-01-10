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
// jsonwebtoken docs: https://github.com/auth0/node-jsonwebtoken
// Passport docs: http://www.passportjs.org/docs/

// see above for explanation of "salting", 10 rounds is recommended
const bcryptSaltRounds = 10


const Destination = require('../models/destination')
const User = require('../models/user')
const Review = require('../models/review')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })
const API_KEY = process.env.API_KEY
// instantiate a router (mini app that only handles routes)
const router = express.Router()

// API call to get all destinations
router.get('/destinations', requireToken, (req, res, next) => {
    axios.get('https://api.roadgoat.com:80/api/v2/destinations/auto_complete?q=barcelona', {
        headers: {
            'Authorization': `Basic ${API_KEY}`
        }
    }).then(resp => {
        console.log('Destinations:\n', resp.data)
    }).catch(next)
})