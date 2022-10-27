import profileModel from '../models/profileModel.js'

const createProfile = async (req,res)=>{
    try {
        // console.log(req.body);
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

const getProfileDetails = async (req,res)=>{ 
    console.log(req.params.email);
    try {
        const data = await profileModel.find({
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

const updateProfile = async (req,res)=>{
    let link = req.query.links;
    link = link.split(",");
    console.log(link)
    const f_data = {
        ...req.query,
        links: link
    }
    // console.log("data :-" , req.query)
    try{
        const data = await profileModel.updateOne(
            {
                data: req.query.data
            },
            {
                $set:f_data
            }
        )
        console.log(data);
        res.json({
            "message":"Related Data is Successfully updated",
            "data":data
        }).status(200);
    }catch (error) {
        res.send({
            message:"Some Error on Server",
            error
        }).status(400);
    }
}

export {
    createProfile,
    getProfileDetails,
    updateProfile
}