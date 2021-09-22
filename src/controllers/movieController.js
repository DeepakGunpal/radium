const moviesModel101 = require('../models/movieModel.js')

let getMovies = async function (req, res) {

    try {

        let movies = await moviesModel101.find({ isDeleted: false })
        if (movies && movies.length > 0) 
        {
            res.status(200).send({ status: true, data: movies })
        }
         else 
        {
            res.status(404).send({ status: false, msg: 'movie box empty' })
        }
    } 
    catch (error) 
    {
        res.status(500).send({ status: false, msg: error.message })
    }
}

let createMovie = async function (req, res) {

    try {
        if (req.body && Object.keys(req.body).length > 0) 
        {
                let movie = await moviesModel101.create(req.body)
                  res.status(201).send({ status: true, data: movie })
        } else 
        {
            res.status(400).send({ status: false, msg: 'body is required in request' })
        }
    } 
    catch (error) 
    {
        res.status(500).send({ status: false, msg: error.message })
    }
}




let deleteMovie = async function (req, res) {

    try {
        if (req.params.movieId) 
        {
            let deletedMovie = await moviesModel101.findOneAndUpdate({ _id: req.params.movieId, isDeleted: false },
                { $set: { isDeleted: true } },
                { new: true })
            if (deletedMovie) 
            {
                return res.status(200).send({ status: true, data: deletedMovie })
            } else 
            {
                res.status(404).send({ status: false, msg: "Movie not found" })
            }
        } 
        else 
        {
            res.status(400).send({ status: false, msg: "Request must have the movieId" })
        }
    } 
    catch (error) 
    {
        res.status(500).send({ status: false, msg: error.message })
    }
}


let updateMovie = async function (req, res) {

    try {
        if (req.params.movieId && req.body.imdbRating && req.body.actor) 
        {
            let updatedMovie = await moviesModel101.findOneAndUpdate({ _id: req.params.movieId, isDeleted: false },
                { $set: { imdbRating: req.body.imdbRating }, $push: { actor: req.body.actor } },
                { new: true })
            if (updatedMovie) 
            {
                return res.status(200).send({ status: true, data: updatedMovie })
            } else 
            {
                res.status(404).send({ status: false, msg: "Movie not found" })
            }
        } 
        else
        {
            res.status(400).send({ status: false, msg: "new actor,movieId and imdb rating  are  not present in request" })
        }
    } catch (error) 
    {
        res.status(500).send({ status: false, msg: error.message })
    }
}





module.exports.createMovie = createMovie
module.exports.getMovies = getMovies
module.exports.updateMovie = updateMovie
module.exports.deleteMovie = deleteMovie
