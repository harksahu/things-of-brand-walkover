import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({

    sno_id:String,
    CollectionName: {
        type: String,
    },
    email:{
        type: String,
    },
    Logos:{
        type: [String]
    }

})

const Collection = mongoose.model("Collections",CollectionSchema)

export default Collection;