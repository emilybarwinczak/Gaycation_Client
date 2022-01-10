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


// API call to get top 5 destinations
router.get('/destinations', (req, res, next) => {
    // function getRandomCity(arr) {
    //     const randomIndex = Math.floor(Math.random()* arr.length - 1)
    //     const city = arr[randomIndex]
    //     return city
    // }
    // const citiesArray = ['new-york', 'london', 'san-francisco', 'paris', 'los-angeles', 'amsterdam', 'chicago', 'barcelona', 'boston', 'rome'] 
    axios.get(`https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${req.params}`, 
    {
        headers: { 
            'Authorization': `Basic ${process.env.AUTH_KEY}`
          }
    })
    .then(resp => {
        console.log('Destination:\n', resp.data.included)
        function isLgbtFriendly(lgbt) {
            return lgbt.id === 18;
        }
        res.json(resp.data.included)
    })
    .catch(next)
})


// API call to get one destination
router.get('/destinations/:destination', (req, res, next) => {
    const key_value = `?q=${req.params.destination}`
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

router.get('')

module.exports = router