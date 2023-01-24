import mongoose from 'mongoose'; 
const CompanySchema = new mongoose.Schema({

    sno_id:String,
    name: {
        type: String,
    },
    sharedEmail:{
        type:[String],
    },
    aboutus:  {
        type: String,
    },
    logo:  {
        type: String
    },
    links :{
        type: [String]
    },
    domain : {
        type: String,
        unique: true
    },
    guidlines: {
        type: String,
    },
    fontLink:{
        type: [String]
    },
    color:[{
        colorName: String,
        colorValue: String
    }],
    email:{
        type: String,
        unique: false
    },
    verify:{
        type: String,
    },
    img_section:{
        type:[Array]
    },
    text_section:{
        type:[Array]
    }

    })

    const Companies = mongoose.model("profiles",CompanySchema)

export default Companies;
