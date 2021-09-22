const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    director: String,
    actor: [String],
    isDeleted: {
        type: Boolean,
        default: false
    },
    awards: {
        type: String,
        default: []
    },
    releaseYear: Number,
    imdbRating: Number
}, { timestamps: true })

module.exports = mongoose.model('Movie', movieSchema)