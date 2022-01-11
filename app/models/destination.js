const mongoose = require('mongoose')
const businessSchema = require('./business')
const reviewSchema = require('./review')
const Schema = mongoose.Schema

const destinationSchema = new Schema(
	{
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
		},
		country: {
			type: String,
        },
        lgbtRating: {
			type: Number
        },
        image_url: String,
        description: String,
        owner: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
        business: [businessSchema],
        reviews: [reviewSchema],
		roadGoatId: {
			type: String
		}
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Destination', destinationSchema)