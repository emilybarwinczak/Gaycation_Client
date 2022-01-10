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
require('dotenv').config()


const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError
const bcryptSaltRounds = 10

const Destination = require('../models/destination')
const User = require('../models/user')
const Review = require('../models/review')

const router = express.Router()


// API call to get all destinations
router.get('/:destination', (req, res, next) => {
    axios.get(`https://api.roadgoat.com/api/v2/destinations${req.params.destination}`, {
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


module.exports = router