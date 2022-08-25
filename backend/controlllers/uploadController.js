
const uploadSingleFileAndSendUrl = async(req,res)=>{
     res.send(req.file.path)
}

export {uploadSingleFileAndSendUrl}