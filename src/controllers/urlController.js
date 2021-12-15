let urlModel = require("../models/urlModel")
const shortid = require('shortid')
const baseUrl = 'http://localhost:3000'
const { promisify } = require("util");
const { redisClient } = require("../server")

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

let shortenUrl = async (req, res) => {
    let longUrl = req.body.longUrl
    const shortCode = shortid.generate()

    if (longUrl) {
        try {

            longUrl = longUrl.trim()

            if (!(longUrl.includes('//'))) {
                return res.status(400).send({ status: false, msg: 'Invalid longUrl' })
            }

            const urlParts = longUrl.split('//')
            const scheme = urlParts[0]
            const uri = urlParts[1]
            let shortenedUrlDetails

            if (!(uri.includes('.'))) {
                return res.status(400).send({ status: false, msg: 'Invalid longUrl' })
            }

            const uriParts = uri.split('.')

            if (!(((scheme == "http:") || (scheme == "https:")) && (uriParts[0].trim().length) && (uriParts[1].trim().length))) {
                return res.status(400).send({ status: false, msg: 'Invalid longUrl' })
            }
            
            shortenedUrlDetails = await urlModel.findOne({
                longUrl: longUrl
            })

            if (shortenedUrlDetails) {
                res.status(201).send({ status: true, data: shortenedUrlDetails })
            } else {
                const shortUrl = baseUrl + '/' + shortCode.toLowerCase()
                shortenedUrlDetails = await urlModel.create({ longUrl: longUrl, shortUrl: shortUrl, urlCode: shortCode })

                await SET_ASYNC(shortCode.toLowerCase(), longUrl);
                res.status(201).send({ status: true, data: shortenedUrlDetails })

            }
        }
        catch (error) {
            res.status(500).send({ status: false, msg: error.message })
        }
    } else {
        res.status(401).send({ status: false, msg: 'longUrl must be present in the body' })
    }

}


let fetchOriginalUrl = async (req, res) => {
    try {
        let cachedLongUrl = await GET_ASYNC(req.params.urlCode);

        if (cachedLongUrl) {
            return res.redirect(cachedLongUrl)
        } else {
            const originalUrlDetails = await urlModel.findOne({
                urlCode: req.params.urlCode
            })
            if (originalUrlDetails) {

                return res.redirect(originalUrlDetails.longUrl)
            } else {
                return res.status(404).send({ status: false, msg: 'No URL Found' })
            }
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

module.exports.shortenUrl = shortenUrl
module.exports.fetchOriginalUrl = fetchOriginalUrl