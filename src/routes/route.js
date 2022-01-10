const express = require("express");
const router = express.Router();


router.get('/mock-api', (req,res)=>{
    console.log( process.env.AWS_KEY )
    // let decoded= jwt.verify( token, process.env.JWTSECRETKEY  )
    res.send("hi")

});

module.exports = router;
