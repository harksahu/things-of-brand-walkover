import mongoose from 'mongoose'; 
const StuffSchema = new mongoose.Schema({

    sno_id:String,
    email: {
        type: String,
        require: true,
        unique:false
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
        type: [String]
    },
    collections : {
        type: [String]
    },
    active: {
        type: Boolean,
        default: 1
    },
    domain:{
        type: String
    }
    })

    const Stuff = mongoose.model("brands",StuffSchema)

export default Stuff;