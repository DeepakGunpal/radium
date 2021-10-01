const userModel =require('../models/userModel')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')

let registerUser = async function (req,res) {

    try{
        if(req.body){
            let newUser = await userModel.create(req.body)
            res.status(201).send({ status: true, data: newUser })
        }
        else {
            res.status(400).send({ status: false,msg :"bad request,fill the fields properly" })

        }

    }catch (error) {

        res.status(500).send({ status: false, msg: error.message })

    }
}

let getUsers = async function (req,res) {
    try{
        let users=await userModel.find({isDeleted:false})
        if (users && users.length > 0) {
           res.status(200).send({ status: true, data: users })
       } else {
           res.status(400).send({status: false,msg: "no users found"})
       }

    } catch(error) {
       res.status(500).send({ status: false, msg: error.message })

    }
}

let userLogin = async function (req,res) {
    try {
          if(req.body&&req.body.name&&req.body.password){
              let user= await userModel.findOne({name:req.body.name,password:req.body.password,isDeleted:false});
              if(user){
                    let payload = { _id: user._id };
	                let token = jwt.sign(payload, 'mysecretkey');
                    res.header('x-auth-token', token);
	                res.status(200).send({ status: true,data:user });
              }
              else
              {
                  res.status(401).send({status:false,msg:"invalid name and password "})
              }
          }
          else{
              res.status(400).send({status:false,msg:"please enter the crendentials properly"})
          }

    }catch(error) {

        res.status(500).send({status:false,msg:error.message})


    }
}


let putUserInfo = async function (req,res) {
   try{
    //    let token=req.header('x-auth-token')
    //    let validatedToken=jwt.verify(token,'mysecretkey')
    //    if(validatedToken)
    //    {
           if(req.params.userId==req.validatedToken._id){
                let updatedUser = await userModel.findOneAndUpdate({ _id: req.params.userId, isDeleted: false }, { $set: { name: req.body.name, mobile:req.body.mobile }},{new:true})
                if (updatedUser) {
                  res.status(200).send({ status: true, data: updatedUser })
                } else {
                  res.status(404).send({ status: false, msg: "User not found" })
                }
           }
           else{
              res.status(403).send({ status: false, msg: "unauthorized user cant put" })
           }
    //    }
    //    else{
    //     res.status(401).send({ status: false, msg: "not aregitered token" })
    //    }

   }catch(error){
    res.status(500).send({status:false,msg:error.message})

   }

}

let getUserInfo = async function (req,res) {
    try{
        // let token=req.header('x-auth-token')
        // let validatedToken=jwt.verify(token,'mysecretkey')
        // if(validatedToken)
        // {
            if(req.params.userId==req.validatedToken._id){
                 let user = await userModel.findOne({ _id: req.params.userId, isDeleted: false })
                 if (user) {
                   res.status(200).send({ status: true, data: user })
                 } else {
                   res.status(404).send({ status: false, msg: "User not found" })
                 }
            }
            else{
               res.status(403).send({ status: false, msg: "unauthorized user" })
            }
        // }
        // else{
        //  res.status(401).send({ status: false, msg: "not aregitered token" })
        // }
 
    }catch(error){
     res.status(500).send({status:false,msg:error.message})
 
    }
 
 }




module.exports.registerUser=registerUser
module.exports.getUsers=getUsers
module.exports.userLogin=userLogin
module.exports.getUserInfo=getUserInfo
module.exports.putUserInfo=putUserInfo
