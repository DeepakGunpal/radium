const express = require('express');

const movieController = require('../controllers/movieController')
const userController = require('../controllers/userController')
const urlController = require('../controllers/urlController')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const router = express.Router();



let tokenVerification = (req,res,next) =>{
    try{

    let token=req.header('x-auth-token')
    if(token) {
        let validatedToken=jwt.verify(token,'mysecretkey')

        if(validatedToken){
               req.validatedToken=validatedToken;
               next()
        } else {
            res.status(401).send({ status: false, msg: "invalid token" })
}
    } else {
        res.status(400).send({ status: false, msg: "request header must contain token" })
    }
        
    } catch(error){
        res.status(500).send({status: false, msg: error.message})
    }

}

// User routes

router.post('/api/user',userController.registerUser)
router.get('/api/getUsers',userController.getUsers)
router.post('/api/userLogin',userController.userLogin)
//router.get('/api/getUserInfo/:_id"',userController.getUserInfo)
router.get('/api/users/:userId',tokenVerification, userController.getUserInfo)
router.put('/api/putUserInfo/:userId',tokenVerification,userController.putUserInfo)


// Movie routes
router.get('/api/movies',movieController.getMovie)
router.post('/api/postMovies',movieController.createMovie)
router.put('/api/movies/:movieID',movieController.putMovie)
router.delete('/api/movies/:movieID',movieController.deleteMovie) // fix update of rest of the fiuels

//url shortening
router.post('/api/shorteningURL',urlController.postLongURL)
router.get('/api/url/:code',urlController.shorteningURL)



module.exports = router;