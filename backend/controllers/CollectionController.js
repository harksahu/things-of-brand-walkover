import CollectionModel from '../models/CollectionModel.js'
import StuffModel from '../models/StuffModel.js'
const createCollection = async (req, res) => {
    try {
        const data = await CollectionModel.create({
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
const getCollectionDetails = async (req, res) => {
    const _id = req?.query?._id
    const email = req?.query?.email
    const search = _id ? {
        _id: _id,
        email: email
    } :
        {
            email: email
        }
    console.log(search);
    try {
        var data = await CollectionModel.find(search);
        const details =data
        for (let i = 0; i < data?.length; i++) {
            const logo_array = data[i]?.Logos;
            var logo = []
            for (let i = 0; i < logo_array?.length; i++) {
                const logos = await StuffModel.find({
                    _id: logo_array[i],
                    active: 1
    
                });
                const logodata = {}
                logodata["name"] = logos[0]?.title
                logodata["url"] = logos[0]?.url;
                logo.push(logodata)
            }
            details[i] = {
                ...data[i]?._doc,logo
            }
        }
        console.log(logo);
        res.json({
            "message": "Related Data is Successfully Find",
            "data": details
        }).status(200);
    } catch (error) {
        console.log(error);
        res.send({
            message: "Some Error on Server11",
            error
        }).status(400);
    }
}
const updateCollection = async (req, res) => {
    let { CollectionName, _id, Logos } = req.body
    try {
        const data = await CollectionModel.updateMany(
            {
                _id: _id
            },
            {
                $set: {
                    CollectionName,
                    Logos
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
const getCollectionJson = async (_id) => {
    try {
        var data = await CollectionModel.find({
            _id: _id
        });
        const logo_array = data[0]?.Logos;
        var logo = []
        for (let i = 0; i < logo_array?.length; i++) {
            const logos = await StuffModel.find({
                _id: logo_array[i],
                active:1

            });
            const logodata = {}
            logodata["name"] = logos[0]?.title
            logodata["url"] = logos[0]?.url;
            logo.push(logodata)
        }
        return [{ logo, ...data[0]._doc }]
    } catch (error) {
        return error
    }
}


const deleteCollection = async (req, res) => {
    let data;
    try {
      data = await CollectionModel.deleteOne({_id:req.params.id});
    } catch (err) {
      console.log(err);
    }
    if (!data) {
      return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" });
  };
export {
    createCollection,
    getCollectionDetails,
    updateCollection,
    getCollectionJson,
    deleteCollection
}