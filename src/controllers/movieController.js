const movieModel = require('../models/movieModel')


let createMovie = async function (req, res) {

    try {
        if (req.body && Object.keys(req.body).length > 0) {
            let movie = await movieModel.create(req.body)
            res.status(201).send({ status: true, data: movie })
        } else {

            res.status(400).send({ status: false, msg: 'Request must contain a body' })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


let getMovies = async function (req, res) {

    try {

        let movies = await movieModel.find({ isDeleted: false })
        if (movies && movies.length > 0) {
            res.status(200).send({ status: true, data: movies })
        } else {
            res.status(404).send({ status: false, msg: 'No movies found' })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


let updateMovie = async function (req, res) {

    try {
        if (req.params.movieId && req.body.imdbRating && req.body.actor) {
            let updatedMovie = await movieModel.findOneAndUpdate({ _id: req.params.movieId, isDeleted: false },
                { $set: { imdbRating: req.body.imdbRating }, $push: { actor: req.body.actor } },
                { new: true })
            if (updatedMovie) {
                return res.status(200).send({ status: true, data: updatedMovie })
            } else {
                res.status(404).send({ status: false, msg: "Movie not found" })
            }
        } else {
            res.status(400).send({ status: false, msg: "Request must have the movieId in params and imdb rating & a new actor in the request body" })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


let deleteMovie = async function (req, res) {

    try {
        if (req.params.movieId) {
            let deletedMovie = await movieModel.findOneAndUpdate({ _id: req.params.movieId, isDeleted: false },
                { $set: { isDeleted: true } },
                { new: true })
            if (deletedMovie) {
                return res.status(200).send({ status: true, data: deletedMovie })
            } else {
                res.status(404).send({ status: false, msg: "Movie not found" })
            }
        } else {
            res.status(400).send({ status: false, msg: "Request must have the movieId" })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.createMovie = createMovie
module.exports.getMovies = getMovies
module.exports.updateMovie = updateMovie
module.exports.deleteMovie = deleteMovie