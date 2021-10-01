
const movieModel = require('../models/movieModel')


let createMovie = async function (req, res) {

    try {
        if (req.body) {
            let movie = await movieModel.create(req.body)
            res.status(201).send({ status: true, data: movie })
        } else {

            res.status(400).send({ status: false, msg: 'Request must contain a body' })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

let getMovie = async function (req, res) {//404 case
    try {
        let movies = await movieModel.find({ isDeleted: false })
        if (movies && movies.length > 0) {
            res.status(200).send({ status: true, data: movies })
        } else {
            res.status(400).send({ status: false, msg: "no movies exist" })
        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })

    }


}

let putMovie = async function (req, res) {//404 instead of 400, response is still the old document
    try {
        if (req.params.movieID && req.body.imdbRating && req.body.actors) {
            //Validate values

            let updatedMovie = await movieModel.findOneAndUpdate({ _id: req.params.movieID, isDeleted: false }, { $set: { imdbRating: req.body.imdbRating }, $push: { actors: req.body.actors } },{new:true})

            updatedMovie ? res.status(200).send({ status: true, data: updatedMovie }) : res.status(400).send({ status: false, msg: "not updated as the requested movie is not found" })
        }
        else {
            res.status(400).send({ status: false, msg: 'please enter the mentioned values properly' })

        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })

    }
}

let deleteMovie = async function (req, res) {
    try {
        if (req.params.movieID && req.params.movieID.length > 0) {
            let deletedMovie = await movieModel.findOneAndUpdate({ _id: req.params.movieID, isDeleted: false }, { $set: { isDeleted: true } })

            deletedMovie ? res.status(200).send({ status: true, msg: "movie has been succesgully deleted" }) : res.status(404).send({ status: false, msg: "requested movie not found" })
        }
        else {
            res.status(400).send({ status: false, msg: 'please enter the movie id properly' })

        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })

    }

}
module.exports.createMovie = createMovie
module.exports.getMovie = getMovie
module.exports.putMovie = putMovie
module.exports.deleteMovie = deleteMovie