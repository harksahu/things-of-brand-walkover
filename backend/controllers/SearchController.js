import BrandModel from '../models/brandModel.js'


const searchBrandName = async (req,res)=>{
    try {
        var title = req.query.title === ""?{}:{title: { '$regex': req.query.title ,"$options":"i"} };
        var description = req.query.description === ""?{}:{description: { '$regex': req.query.description ,"$options":"i"} };
        var email = req.query.email === ""?{}:{email: req.query.email };
        var active = req.query.active === ""?{}:{active: req.query.active };
        console.log(description)
        const data = await BrandModel.find({
                ...title ,
                ...email ,
                ...active ,
                ...description
        });
        res.json({
            "message":"Related Data is Successfully Find",
            "data":data || []
        }).status(200);

        // console.log(data)
    } catch (error) {
        // console.log(error);
        res.status(400).send({
            message:"Some Error on Server",
            error
        });
    }
}

// const searchBrandName = async (req, res) => {
//     //   console.log(req.query.description);
//     let payload = req.query.description.trim();
//     let search = await BrandModel.find({ name:{$regex: new RegExp('^'+description+'.*',i)}}).exec();
//     search = search.slice(0, 10);
// }

export {

    searchBrandName

}

