const fs=require('fs')

let writeFiles =( req,res)=>{
   try{
    let files=req.files
    console.log("files101",files)
    if(files&&files.length>0){
        let fileName=files[0].originalname
        let fileData=files[0].buffer
        console.log("------",fileName,fileData)
        fs.writeFile(fileName,fileData,(error,data)=>{
            error?res.status(400).send({status:false,msg:"eoor while creating file"}):res.status(201).send({status:true,msg:"file created",data})
        })
    }
    else{
        res.status(400).send({status:false,msg:"file information doesnt exist"})
    }
   }
   catch (error){
    res.status(500).send({ status: false, msg: error.message })


   }

}

let writeFileInDirectory=(req,res)=>{
    try{
        let files=req.files
        if(files&&files.length){
            let fileName=files[0].originalname
            let fileData=files[0].buffer
            let targetBucket="src/assets"
            let filePath=targetBucket+fileName
            fs.writeFile(filePath,fileData,(error,data)=>{
                error?res.status(400).send({status:false,msg:"eoor while creating file"}):res.status(201).send({status:true,msg:"file created in assests",data})
            })
          
        }else{
            res.status(400).send({status:false,msg:"file information doesnt exist"})
        }
    }
    catch(error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.writeFiles=writeFiles
module.exports.writeFileInDirectory=writeFileInDirectory