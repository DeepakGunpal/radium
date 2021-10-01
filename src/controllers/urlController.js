let urlModel=require("../models/urlModel")
const validUrl = require('valid-url')
const shortid = require('shortid')
const baseUrl = 'http:localhost:3000'

let postLongURL = async (req,res) => {
    const longString = req.body.longUrl 
    const urlNewCode = shortid.generate()

    if (validUrl.isUri(longString)) {
        try {
            let url = await urlModel.findOne({
                longUrl:longString
            })

            if (url) {
                res.status(201).send({status:true,data:url,msg:"already exists"})
            } else {
               
                const shortString = baseUrl + '/' + urlNewCode
                let newURL = await urlModel.create({longUrl:longString,shortUrl:shortString,urlCode:urlNewCode})
                res.status(201).send({ status: true, data: newURL})
                
            }
        }
        catch (error) {
            res.status(500).send({ status: false, msg: error.message })
        }
    } else {
        res.status(401).send({status:false,msg:'Invalid longUrl'})
    }

}


let shorteningURL = async (req,res) => {
    try {
        const url = await urlModel.findOne({
            urlCode: req.params.code
        })
        if (url) {
           
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).send({status:false,msg:'No URL Found'})
        }

    }
  
    catch (error) {
       
    res.status(500).send({ status: false, msg: error.message })
    }

}

module.exports. postLongURL= postLongURL
module.exports.shorteningURL=shorteningURL