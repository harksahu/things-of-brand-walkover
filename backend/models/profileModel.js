import mongoose from 'mongoose'; 
const profileSchema = new mongoose.Schema({

    sno_id:String,
    name: {
        type: String,
    },
    sharedEmail:{
        type:[String]
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

    })

    const Profile = mongoose.model("profiles",profileSchema)

export default Profile;
