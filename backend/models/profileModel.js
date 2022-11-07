import mongoose from 'mongoose'; 
const profileSchema = new mongoose.Schema({

    sno_id:String,
    name: {
        type: String,
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
    // PrimaryColors:{
    //     type: String
    // },
    // secondaryColors:{
    //     type: String
    // },

    fontLink:{
        type: [String]
    },
    // backgroundColors:{
    //     type: String
    // },
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
