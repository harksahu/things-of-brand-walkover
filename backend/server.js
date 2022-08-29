import express from "express";
import cors from 'cors';
import path from "path";
import multer from "multer";

import uploadRoutes from "./routers/uploadRoutes.js";

// SERVICES

const app = express();
const __dirname = path.resolve();

// MIDDLEWARE
app.use(cors())
app.use(express.json());

//  ROUTES
app.get("/",(req,res)=>{
    res.send("WORKING BACKEND");
})

app.use('/api/uploads',uploadRoutes);

app.get("/uploads/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"uploads",req.params.id));
})

// ERROR HANDLE

app.listen(5001)