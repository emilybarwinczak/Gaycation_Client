const mongoose = require('mongoose')
const Schema = mongoose.Schema

const businessSchema = new Schema(
    {
        name: {
            type: String
        },
        image_url: String,
        website: String,
        yelpId: {
			type: String
		}
    },
    {
        timestamps: true
    }
)

module.exports = businessSchema