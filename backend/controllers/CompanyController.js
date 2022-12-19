import CompanyModel from '../models/CompanyModel.js'
import StuffModel from '../models/StuffModel.js'

const createCompany = async (req, res) => {
    try {

        const data = await CompanyModel.create({
            ...req.body
        });
        res.json({
            "message": "Successfully Created",
            "data": data
        }).status(200);
    } catch (error) {
        console.log(error);
        res.send({
            message: "Some Error on Server",
            error
        }).status(400);
    }
}


const getCompanyDetails = async (req, res) => {

    var email = req.query.email === "" ? {} : { email: req.query.email };
    var _id = req.query._id === "" ? {} : { _id: req.query._id };
    var searchfrom = req.query.searchfrom
    const doaminData = req.query.domain
    var domain = { '$regex': doaminData, "$options": "i" }
    var name = req?.query?.name ? { name: { '$regex': req?.query?.name, "$options": "i" } } : {}
    const search = searchfrom == "true" ? {
        domain: doaminData,
    } :
        {
            $or: [{ domain }, { ...name }],
            ...email,
            ..._id
        }
    try {
        var data = await CompanyModel.find(search);
        res.json({
            "message": "Related Data is Successfully Find",
            "data": data

        }).status(200);
    } catch (error) {
        console.log(error);

        res.send({
            message: "Some Error on Server11",
            error
        }).status(400);
    }

}

const updateCompany = async (req, res) => {

    let { name, aboutus, fontLink } = req.body
    let logo = req.body.logo;
    let links = req.body.links;
    let domain = req.body.domain;
    let guidlines = req.body.guidlines;
    let color = req.body.color;
    let email = req.body.email;
    let verify = req.body.verify
    let link = req.body.links;
    let id = req.body._id;
    let sharedEmail = req.body.sharedEmail ? req.body.sharedEmail : "";
    console.log("shared email", id)
    try {
        const data = await CompanyModel.updateMany(
            {
                _id: id
            },
            {
                $set: {
                    name,
                    aboutus,
                    logo,
                    domain,
                    links,
                    guidlines,
                    color,
                    email,
                    verify,
                    link,
                    fontLink,
                    sharedEmail,
                }
            }
        )

        res.json({
            "message": "Related Data is Successfully updated",
            "data": data
        }).status(200);
    } catch (error) {
        // console.log(error);
        res.send({
            message: "Some Error on Server",
            error
        }).status(400);
    }
}


const getCompanyDetailss = async (req, res) => {
    try {
        const data = await CompanyModel.find({
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
        var data = await CompanyModel.find({
            domain: domain

        });
        const domain1 = data[0]._id;

        const logos = await StuffModel.find({
            domain: domain1,

        });

        // data = data.push(logos)
        return [{ logos, ...data }]
    } catch (error) {


        return error
    }
}







export {
    createCompany,
    getCompanyDetails,
    updateCompany,
    getCompanyDetailss,
    getCompanyJson
}