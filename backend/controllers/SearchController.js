import BrandModel from '../models/brandModel.js'


const searchBrandName = async (req,res)=>{
    try {
        console.log(req.params.text)
        const data = await BrandModel.find({
            $and: [
                { title: { $regex: req.params.text }},
            // {$or: [ { title: { $regex: req.params.text } }, { description: { $regex: req.params.text } } ]},
            // {$or: [ { title: { $in: req.params.text } }, { description: { $in: req.params.text }} ]},
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

    searchBrandName

}

