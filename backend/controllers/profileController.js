import profileModel from '../models/profileModel.js'
import BrandModel from '../models/brandModel.js'

const createProfile = async (req, res) => {
    try {
        console.log(req.body);
        const data = await profileModel.create({
            ...req.body
        });
        res.json({
            "message": "Successfully Created",
            "data": data
        }).status(200);
    } catch (error) {
        console.log("err" + error)
        res.send({
            message: "Some Error on Server",
            error
        }).status(400);
    }
}


const getProfileDetails = async (req, res) => {

    var email = req.query.email === "" ? {} : { email: req.query.email };
    var _id = req.query._id === "" ? {} : { _id: req.query._id };
    var searchfrom = req.query.searchfrom
    var domainCheck = req.params.domain || req.query.domain

    var domain = domainCheck?.length ? { domain: { '$regex': domainCheck, "$options": "i" } } : '';
    var name = req?.query?.name
    // === "" ? {} : { name: { '$regex': req?.query?.name, "$options": "i" } };
    if (searchfrom == "true") {
        try {
            var data = await profileModel.find({
                ...domain,
                ...email,
                ..._id
                // ...domain

            });
            const domain1 = data[0]._id;
            const logos = await BrandModel.find({
                domain: domain1,

            });
            // data = data.push(logos)
            res.json({
                "message": "Related Data is Successfully Find",
                "data": {
                    logos,
                    ...data
                }

            }).status(200);
        } catch (error) {
            console.log(error);

            res.send({
                message: "Some Error on Server",
                error
            }).status(400);
        }
    } else {
        // console.log("afas");
        try {
            const data = await profileModel.find({
                // $or: [{ ...domain }, { ...name }],
                ...domain,
                ...email,

            });
            res.json({
                "message": "Related Data is Successfully Find",
                "data": data
            }).status(200);
        } catch (error) {
            console.log(error);
            res.send({
                message: "Some Error on Server",
                error: error
            }).status(400);
        }
    }
}

const updateProfile = async (req, res) => {
    console.log("logo url in backend", req.body.logo_url);
    let { name, aboutus ,fontLink} = req.body
    let logo = req.body.logo;
    let links = req.body.links;
    let domain = req.body.domain;
    let guidlines = req.body.guidlines;
    let color = req.body.color;

    let email = req.body.email;
    let verify = req.body.verify
    let link = req.body.links;
    let sharedEmail = req.body.sharedEmail ? req.body.sharedEmail : "";
    // console.log(req.body)
    // console.log(link)
    // const f_data = {
    //     ...req.body,
    //     links: link
    // }
    // console.log("data :-" , req.query)
    console.log("logo url in backend 2 ", logo);
    try {
        const data = await profileModel.updateMany(
            {
                domain: domain
            },
            {
                $set: {
                    name,
                    aboutus,
                    logo,
                    links,
                    guidlines,
                    color,
                    email,
                    verify,
                    link,
                    fontLink
                }
            }
        )
        console.log(data);
        res.json({
            "message": "Related Data is Successfully updated",
            "data": data
        }).status(200);
    } catch (error) {
        console.log("error", error);
        res.send({
            message: "Some Error on Server",
            error
        }).status(400);
    }
}


const getCompanyDetailss = async (req, res) => {
    try {
        // console.log(req.params)
        const data = await profileModel.find({
            _id: req.params.id

        });
        res.json({
            "message": "Related Data is Successfully Find",
            "data": data
        }).status(200);
    } catch (error) {
        res.send({
            message: "Some Error on Server",
            error
        }).status(400);
    }
}
const getCompanyJson = async (domain) => {
    try {
        var data = await profileModel.find({
        domain : domain

        });
        const domain1 = data[0]._id;
        console.log(data[0]._id);
        const logos = await BrandModel.find({
            domain: domain1,

        });
        console.log(logos);
        // data = data.push(logos)
        return [{ logos, ...data }]
    } catch (error) {
        console.log(error);

        return error
    }
}







export {
    createProfile,
    getProfileDetails,
    updateProfile,
    getCompanyDetailss,
    getCompanyJson
}