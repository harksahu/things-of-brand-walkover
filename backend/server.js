import express from "express";
import cors from 'cors';
import path from "path";
import multer from "multer";
import connectDB from './services/mongodb_service.js';
import uploadRoutes from "./routers/uploadRoutes.js";
import brandRouters from "./routers/brandRouters.js";
import MyStuffRouters from "./routers/MyStuffRouters.js";



// SERVICES
const app = express();
const __dirname = path.resolve();
connectDB();
// MIDDLEWARE

app.use(cors())
app.use(express.json());

//  ROUTES
app.get("/",(req,res)=>{
    res.send("WORKING BACKEND");
})

app.use('/api/uploads',uploadRoutes);
app.use('/api/brands',brandRouters);
// app.use('/api/search',SearchRouters);
app.use('/api/MyStuff',MyStuffRouters);


app.get("/uploads/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"uploads",req.params.id));
})
// console.log("abc")
// ERROR HANDLE

app.listen(8080)