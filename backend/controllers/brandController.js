import BrandModel from '../models/brandModel.js'
const createBrand = async (req,res)=>{
    try {
        console.log(req.body);
        const data = await BrandModel.create({
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


const deleteBrand = async (req,res)=>{
    try {
        const data = await BrandModel.updateOne({
            url: req.body.url
        },{
            $set: {
                active : 0
            }
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


const UpdateBrand = async (req,res)=>{
    try {
        const data = await BrandModel.findAll({
            email: req.body.email
        },{
            $push: {
                domain: req.body.domain
            }
        });
        res.json({
            "message":"Successfully Updated",
            "data":data
        }).status(200);
    } catch (error) {
        res.send({
            message:"Some Error on Server",
            error
        }).status(400);
    }
}


// const UpdateBrand = async (req,res)=>{
//     try {
//         const data = await BrandModel.find({
//             url: req.body.url
//         },{
//             $set: {
//                 title: req.body.title,
//                 description: req.body.description,
//             }
//         });
//         res.json({
//             "message":"Successfully Updated",
//             "data":data
//         }).status(200);
//     } catch (error) {
//         res.send({
//             message:"Some Error on Server",
//             error
//         }).status(400);
//     }
// }





const searchBrandName = async (req,res)=>{
    const id = req.params.id
    // console.log(titles);
    try {
        const data = await BrandModel.find({
            _id: id

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
    createBrand,
    deleteBrand,
    searchBrandName,
    UpdateBrand 

}

