const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    
    name:{
          type:String,
          unique:true,
          required:true,
    },
    awards:[{
           type:String,
           default:[],    
    }],
    imdbRating:{
        type:Number,
    },
    director:{
        type:String
    },
    actors:[{
        type:String,
        default:[],
    }],
    releaseYear:{
        type:Number
    },
    isDeleted:{
        type:Boolean,
        default:false,
    }
    
})


module.exports = mongoose.model('Movie', movieSchema)
