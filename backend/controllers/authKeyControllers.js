import authKeyModel from '../models/authKeyModel.js'

const storeAuthKey = async (req,res)=>{
    try {
        const data = await authKeyModel.create({
            // ...req.body,
            authKey:req.body.authKey
        });
        res.json({
            "message":"Successfully Created",
            "data":data
        }).status(200);
    } catch (error) {
        res.send({
            message:"Some Error on Server",
            error
        }).status(400);
    }
}


export default storeAuthKey;