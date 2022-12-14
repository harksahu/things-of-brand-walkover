import StuffModel from '../models/StuffModel.js'
const createStuff = async (req,res)=>{
    try {
       
        const data = await StuffModel.create({
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


const deleteStuff = async (req,res)=>{
    try {
        const data = await StuffModel.updateOne({
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


const UpdateStuff = async (req,res)=>{
    try {
        const data = await StuffModel.find({
            url: req.body.url
        },{
            $set: {
                title: req.body.title,
                description: req.body.description,
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





const searchStuffName = async (req,res)=>{
    const id = req.params.id
   
    try {
        const data = await StuffModel.find({
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
    createStuff,
    deleteStuff,
    searchStuffName,
    UpdateStuff 

}

