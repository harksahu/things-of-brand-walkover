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
    ImageSections:[{
        imageName:String,
        imageValue:String
    }],
    TextSections:[{
        textName:String,
        textValue:String
    }]
    })

    const Companies = mongoose.model("profiles",CompanySchema)

export default Companies;
