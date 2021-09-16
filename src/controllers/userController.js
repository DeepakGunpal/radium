const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

let userModel = require("../models/userModel.js")

let registerUser = async function (req, res) {
    try {
        if (req.body && Object.keys(req.body).length > 0) {
            let user = await userModel.create(req.body)
            res.status(201).send({ status: true, data: user })
        } else {
            res.status(400).send({ status: false, msg: 'Request must contain a body' })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

let getUsers = async function (req, res) {
    try {
        let users = await userModel.find({ isDeleted: false }, { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 })
        if (users && users.length > 0) {
            res.status(200).send({ status: true, data: users })
        } else {
            res.status(404).send({ status: false, msg: "No users found" })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


//YAGNI == You aint gonna need it
let loginUser = async function (req, res) {
    try {
        if (req.body && req.body.userName && req.body.password) {
            let user = await userModel.findOne({ name: req.body.userName, password: req.body.password, isDeleted: false }, { createdAt: 0, updatedAt: 0, __v: 0 })
            if (user) {
                let payload = { _id: user._id }
                let token = jwt.sign(payload, 'mysecretkey')

                res.header('x-auth-token', token)
                res.status(200).send({ status: true })
            } else {
                res.status(401).send({ status: false, msg: "Invalid username or password" })
            }
        } else {
            res.status(400).send({ status: false, msg: "Request body must contain userName as well as password" })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

let getUserDetails = async function (req, res) {
    try {
        let token = req.headers['x-auth-token']
        let validToken = jwt.verify(token, 'mysecretkey')
        if (validToken) {
            if (validToken._id == req.params.userId) {
                let user = await userModel.findOne({ _id: req.params.userId, isDeleted: false })
                if (user) {
                    res.status(200).send({ status: true, data: user })
                } else {
                    res.status(404).send({ status: false, msg: "User not found" })
                }
            } else {
                res.status(403).send({ status: false, msg: "Not authorized" })
            }
        } else {
            res.status(401).send({ status: false, msg: "Invalid token" })
        }
    } catch (error) {
        res.status(500).send({ staus: false, msg: error.message })
    }
}

module.exports.registerUser = registerUser
module.exports.getUsers = getUsers
module.exports.loginUser = loginUser
module.exports.getUserDetails = getUserDetails


