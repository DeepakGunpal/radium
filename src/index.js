if (process.env.NODE_ENV) {
    require ("dotenv").config({
        path:`./.env.${process.env.NODE_ENV}`
    })
} else require ("dotenv").config()
// you can skip the understanding for the above lines (totally irrelevant) 


console.log("value is",  process.env.MYVAR)

const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose')

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', route);


// mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).then(() => console.log('MongoDB is connected. mongodb running on 27017')).catch(err => console.log(err))


console.log( process.env.MONGO_URI )
mongoose.connect( process.env.MONGO_URI, {useNewUrlParser: true}).then(() => console.log('MongoDB is connected. mongodb running on 27017')).catch(err => console.log(err))


app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});