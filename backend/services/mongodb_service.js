import mongoose from 'mongoose';
const connectDB = async ()=>{
    try {
        console.log(process.env.MONGODB_URI);
        const conn = await mongoose.connect(process.env.MONGODB_URI , {
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        console.log(`CONNECT TO M_DB ${conn.connection.host}`);
    } catch (error) {
        console.log(`ERROR:- ${error}`);
    }
}




export default connectDB;