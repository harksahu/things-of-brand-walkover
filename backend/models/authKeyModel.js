import mongoose from 'mongoose';

const authKeySchema = new mongoose.Schema({

    authKey: {
        type: String,
        unique: true
    }
})

const authorizeKey = mongoose.model("authKeys",authKeySchema)

export default authKey;