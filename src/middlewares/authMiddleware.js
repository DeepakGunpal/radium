const jwt = require("jsonwebtoken")

const authMiddleware =  (req, res, next) => {
    try {
        const token = req.header('x-api-key')
        console.log("token" , token)
        if(!token) {
            res.status(401).send({status: false, message: `Missing authentication token in request`})
            return
        }

        const decoded =  jwt.verify(token, 'someverysecuredprivatekey291@(*#*(@(@()');

        if(!decoded) {
            res.status(401).send({status: false, message: `Invalid authentication token in request`})
            return
        }

        req.userId = decoded.userId

        next()
    } catch (error) {
        console.error(`Malformed token : ${error.message}`)
        res.status(401).send({status: false, message: error.message})
    }
}

module.exports = authMiddleware