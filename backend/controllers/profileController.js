import profileModel from '../models/profileModel.js'

const createProfile = async (req,res)=>{
    try {
        console.log(req.body);
        const data = await profileModel.create({
            ...req.body
        });
        res.json({
            "message":"Successfully Created",
            "data":data
        }).status(200);
    } catch (error) {
        console.log("err" + error)
        res.send({
            message:"Some Error on Server",
            error
        }).status(400);
    }
}


const getProfileDetails = async (req,res)=>{ 
    // console.log(req.query.email);
    var email = req.query.email === ""?{}:{email: req.query.email };
    var _id = req.query._id === ""?{}:{_id: req.query._id };
    var searchfrom = req.query.searchfrom 
    var domain = req.query.domain === ""?{}:{domain: { '$regex': req.query.domain ,"$options":"i"} };
    var name = req.query.name === ""?{}:{name: { '$regex': req.query.name ,"$options":"i"}};

    console.log(searchfrom);
   if (searchfrom == "true") {
    try {
        const data = await profileModel.find({
              ...domain ,
            ...email,
            ..._id
            // ...domain

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
   } else {
    // console.log("afas");
    try {
        const data = await profileModel.find({
            $or: [  { ...domain  },{  ...name } ] ,
            // ...domain,
            ...email,

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
}

const updateProfile = async (req,res)=>{
    console.log("logo url in backend",req.body.logo_url);
    let {name ,aboutus } = req.body
      let logo=req.body.logo;
      let links=req.body.links;
      let domain=req.body.domain;
     let  guidlines=req.body.guidlines;
      let color=req.body.color;

      let email=req.body.email;
      let verify=req.body.verify
      let link = req.body.links;
      let sharedEmail=req.body.sharedEmail? req.body.sharedEmail : "";
    // console.log(req.body)
    // console.log(link)
    // const f_data = {
    //     ...req.body,
    //     links: link
    // }
    // console.log("data :-" , req.query)
    console.log("logo url in backend 2 ",logo);
    try{
        const data = await profileModel.updateMany(
            {
                domain: domain
            },
            {
                $set:{
                    name,
                    aboutus,
                    logo,
                    links,
                    guidlines,
                    color,
                    email,
                    verify,
                    link,
                }
            }
        )
        console.log(data);
        res.json({
            "message":"Related Data is Successfully updated",
            "data":data
        }).status(200);
    }catch (error) {
        console.log("error", error);
        res.send({
            message:"Some Error on Server",
            error
        }).status(400);
    }
}


const getCompanyDetailss = async(req,res)=>{
    try {
        // console.log(req.params)
        const data = await profileModel.find({
              _id : req.params.id 
             
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
    createProfile,
    getProfileDetails,
    updateProfile,
    getCompanyDetailss
}