import profileModel from '../models/profileModel.js'

const createProfile = async (req,res)=>{
    try {
        console.log(req.body);
        const data = await profileModel.create({
            ...req.body,
            Url:req.body.url
        
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
export default createProfile;  