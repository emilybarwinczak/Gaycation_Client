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
const API_KEY = process.env.API_KEY
const SECRET_KEY = process.env.SECRET_KEY
// instantiate a router (mini app that only handles routes)
const router = express.Router()
const auth_key = Buffer.from(`${API_KEY}:${SECRET_KEY}`).toString('base64');


// API call to get all destinations
// router.get('/destinations', (req, res, next) => {
//     axios.get('https://api.roadgoat.com/api/v2/destinations/auto_complete?q=barcelona', {
//         headers: {
//             'Authorization': `Basic ${auth_key}`
//         }
//     }).then(resp => {
//         console.log('Destination:\n', resp.data)
//     }).catch(next)
// })

module.exports = router