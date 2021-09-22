const express = require('express');

const movieController = require('../controllers/movieController')
const userController = require('../controllers/userController')

const router = express.Router();

// User routes
router.get('/api/users/:userId', userController.getUserDetails)
router.get('/api/users', userController.getUsers)
router.post('/api/login', userController.loginUser)
router.post('/api/users', userController.registerUser)

// Movie routes
router.get('/api/movies', movieController.getMovies)
router.post('/api/movies', movieController.createMovie)
router.put('/api/movies/:movieId', movieController.updateMovie)
router.delete('/api/movies/:movieId', movieController.deleteMovie)



module.exports = router;