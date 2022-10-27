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
        type: String,
        default: null
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
    PrimaryColors:{
        type: String
    },
    secondaryColors:{
        type: String
    },

    fontSize:{
        type: String
    },
    backgroundColors:{
        type: String
    },
    email:{
        type: String
    },
    verify:{
        type:String
    }
    })

    const Profile = mongoose.model("profiles",profileSchema)

export default Profile;