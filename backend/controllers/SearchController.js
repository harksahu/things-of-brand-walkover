import StuffModel from '../models/StuffModel.js'


const searchStuffName = async (req, res) => {
    try {
        var title = req.query.title === "" ? {} : { title: { '$regex': req.query.title, "$options": "i" } };
        var description = req.query.description === "" ? {} : { description: { '$regex': req.query.description, "$options": "i" } };
        var email = req.query.email === "" ? {} : { email: req.query.email };
        var active = req.query.active === "" ? {} : { active: req.query.active };
        var _id = req.query._id === "" ? {} : { _id: req.query._id };
        var domain = req.query.domain === "" ? {} : { domain: req.query.domain };
        const data = await StuffModel.find({


            //  $or: [ { ...title  }, { ...description } ] ,
            ...title,
            ...email,
            ...active,
            ..._id,
            ...domain,

        });
        res.json({
            "message": "Related Data is Successfully Find",
            "data": data || []
        }).status(200);

    } catch (error) {
        
        res.status(400).send({
            message: "Some Error on Server",
            error
        });
    }
}



export {

    searchStuffName

}

