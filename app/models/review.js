const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema(
    {
        // want to create a refernece  to the username by the objectId
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String,
        body: String,
    },
    {
        timestamps: true
    }
)

module.exports = reviewSchema