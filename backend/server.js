import express from "express";
import cors from 'cors';
import path from "path";
// import multer from "multer";
import authKeyRouters from "./routers/authKeyRouters.js";
import connectDB from './services/mongodb_service.js';
import uploadRoutes from "./routers/uploadRoutes.js";
import brandRouters from "./routers/brandRouters.js";
import MyStuffRouters from "./routers/MyStuffRouters.js";
import SearchRouters from "./routers/SearchRouters.js";
import MyStuffdeleteitemRouters from "./routers/MyStuffdeleteitemRouters.js";
import {generateUploadURL} from './services/s3.js';


import dotenv from 'dotenv'

dotenv.config({path:'../.env'})


// SERVICES
const app = express();
const __dirname = path.resolve();
connectDB();

// MIDDLEWARE

app.use(cors())
app.use(express.json());

//  ROUTES


app.use('/api/uploads',uploadRoutes);
app.use('/api/brands',brandRouters);
app.use('/api/search',SearchRouters);
app.use('/api/MyStuff',MyStuffRouters);
app.use('/api/deteteItems',MyStuffdeleteitemRouters);
app.use('/api/storeKey',authKeyRouters);
app.use('/api/deleteKey',authKeyRouters);

app.get('/s3url',async(req,res)=>{
    console.log("file:-");
    console.log(req)
    const url = await generateUploadURL()

    res.send({url});
})


app.get("/uploads/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"uploads",req.params.id));
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname , 'frontend' , 'build' , 'index.html'))
    )
}else{
     app.get("/",(req,res)=>{
        res.send("Api working");
     })
}




// console.log("abc")
// ERROR HANDLE

const PORT = process.env.PORT || 8080

app.listen(PORT , console.log("listening on port "+PORT))