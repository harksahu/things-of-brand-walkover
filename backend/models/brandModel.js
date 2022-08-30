import mongoose from 'mongoose'; 
const brandsSchema = new mongoose.Schema({

    sno_id:String,
    email: {
        type: String,
        require: true
    },
    url:  {
        type: String,
        unique:true
    },
    title :{
        type: String,
        require: true
    },
    description : {
        type: String
    },
    active: {
        type: Boolean,
        default: 1
    },
    })

    const Brand = mongoose.model("brands",brandsSchema)

export default Brand;