import mongoose from 'mongoose';

const authKeySchema = new mongoose.Schema({

    authKey: {
        type: String,
        unique: true
    }
})

const authKey = mongoose.model("authKeys",authKeySchema)

export default authKeySchema;