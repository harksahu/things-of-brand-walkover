import CollectionModel from '../models/CollectionModel.js'

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
    const CollectionName = req?.query?.CollectionName
    const email = req?.query?.email
    const search = CollectionName ? {
        CollectionName: CollectionName,
        email : email
    } :
        {
            email :email
        }
        console.log(search);
    try {
        var data = await CollectionModel.find(search);
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


const getCollectionJson = async (domain) => {
    //     try {
    //         var data = await CollectionModel.find({
    //             domain: domain

    //         });
    //         const domain1 = data[0]._id;

    //         const logos = await StuffModel.find({
    //             domain: domain1,

    //         });

    //         // data = data.push(logos)
    //         return [{ logos, ...data }]
    //     } catch (error) {


    //         return error
    //     }
}







export {
    createCollection,
    getCollectionDetails,
    updateCollection,
    getCollectionJson
}