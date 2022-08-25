import express from "express";
import uploadRoutes from "./routers/uploadRoutes.js";
const app = express();
import cors from 'cors';

app.use(cors())

app.use(express.json());


app.use('/api/upload',uploadRoutes);

app.get("/",(req,res)=>{
    res.send("WORKING BACKEND");
})



app.listen(5001)