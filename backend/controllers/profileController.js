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

const getProfileDetails = async (req,res)=>{ 
    console.log(req.query.email);
    var email = req.query.email === ""?{}:{email: req.query.email };
    var domain = req.query.domain === ""?{}:{domain: req.query.domain };
    var name = req.query.name === ""?{}:{name: { '$regex': req.query.name ,"$options":"i"} };

    try {
        const data = await profileModel.find({
            ...email,
            ...domain,
            ...name
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
    let link = req.body.links;
    console.log(req.body)
    console.log(link)
    const f_data = {
        ...req.body,
        links: link
    }
    // console.log("data :-" , req.query)
    try{
        const data = await profileModel.updateOne(
            {
                email: req.body.email
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