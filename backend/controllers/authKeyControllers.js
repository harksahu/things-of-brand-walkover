import AuthKeyModel from '../models/AuthKeyModel.js'

const storeAuthKey = async (req,res)=>{
    try {
        // console.log(req.body.email);
        const data = await AuthKeyModel.create(
           { 
            ...req.body,
        authKey : req.body.authKey,
        email : req.body.email
    }   
        );
        res.json({
            "message":"Successfully Created",
            "data":data
        }).status(200);
    } catch (error) {
        res.send({
            message:"Some Error on Server",
            error : error,
           
        }).status(400);
    }
}

const deleteAuthKey = async (req,res)=>{
    try {
        
        const data = await AuthKeyModel.findOneAndDelete({
            email: req.query.email,
            authKey: req.query.authKey 
        });
        res.json({
            "message":"Successfully Deleted",
            "data":data
        }).status(200);
    } catch (error) {
        res.send({
            message:"Some Error on Server",
            error
        }).status(400);
    }
}


const getAuthorizedKey = async (req,res)=>{

    try {
        const data = await AuthKeyModel.find({
            email: req.params.email
        });
        res.json({
            "message":"Related Data is Successfully Find",
            "data":data
        }).status(200);
    } catch (error) {
        res.send({
            message:"Some Error on Server",
            error
        }).status(400);
    }
}


export {
    storeAuthKey,
    deleteAuthKey,
    getAuthorizedKey
}