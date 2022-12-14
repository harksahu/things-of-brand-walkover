import StuffModel from '../models/StuffModel.js'


const deleteStuff = async (req,res)=>{
    try {
        const data = await StuffModel.updateOne({
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


const UpdateStuff = async (req,res)=>{
   
    var name = req.query.title
    
    var id = req.query._id
   
    try {
        const data = await StuffModel.updateOne({
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





const searchStuffName = async (req,res)=>{
    try {
        
        const data = await StuffModel.find({
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
    deleteStuff,
    searchStuffName,
    UpdateStuff 

}

