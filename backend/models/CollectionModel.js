import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({

    sno_id:String,
    CollectionName: {
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    Logos:{
        type: [String]
    }

})

const Collection = mongoose.model("Collections",CollectionSchema)

export default Collection;