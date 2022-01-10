const mongoose = require('mongoose')
const reviewSchema = require('./review')

const destinationSchema = new mongoose.Schema(
	{
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		country: {
            type: String,
            required: true
        },
        lgbtRating: {
            type: Number
        },
        image_url: String,
        description: String,
        users: Array,
        business: Array,
        reviews: [reviewSchema]
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Destination', destinationSchema)
