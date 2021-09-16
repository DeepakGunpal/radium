const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    imdbRating: Number,

    director: String,

    actor: [String],

    releaseYear: Number,

    awards: {
        type: String,
        default: []
    },
    // attribute : type
    // OR
    // attribute : { type: <data type>, validation1, validation2, etc}
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Movie', movieSchema)