import BrandModel from '../models/brandModel.js'


const deleteBrand = async (req,res)=>{
    try {
        const data = await BrandModel.updateOne({
            _id: req.params.id
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
    // console.log("deletedata");
    var name = req.query.title
    
    var id = req.query._id
    // console.log(id)
    // console.log(name)
    try {
        const data = await BrandModel.updateOne({
            _id : id
        },{
            $set: {
                title: name,
            }
        });
        res.json({
            "message":"Successfully Updated",
            "data":"data"
        }).status(200);
    } catch (error) {
        res.send({
            message:"Some Error on Server",
            error
        }).status(400);
    }
}





const searchBrandName = async (req,res)=>{
    try {
        // console.log(req.params.email)
        const data = await BrandModel.find({
            $and: [
                { email : req.params.email },
                { active: 1 }
             ]
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
    deleteBrand,
    searchBrandName,
    UpdateBrand 

}

