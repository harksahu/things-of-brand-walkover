import mongoose from 'mongoose';

const authKeySchema = new mongoose.Schema({

    authKey: {
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    }
})

const authorizedKeys = mongoose.model("authKeys",authKeySchema)

export default authorizedKeys;