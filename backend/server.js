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
import profileRouters from "./routers/profileRouters.js";
import puppy from "./details_feacher/getData.js"
import getUpdatedData from "./details_feacher/gettingdata.js";
import {setConfigTable,getUrlFromTable} from "./details_feacher/getUrlFromTable.js";
import dotenv from 'dotenv'
import { log } from "console";

dotenv.config({path:'../.env'})


// SERVICES
const app = express();
const __dirname = path.resolve();
connectDB();
const PORT = process.env.PORT || 8080


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
app.use('/api/profile',profileRouters);

app.get('/s3url',async(req,res)=>{
    // console.log("file:-");
    // console.log(req)
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

app.post("/croneUpdatedata", async (req, res) => {
  // console.log("app:-");
  const timeDelay = () => {
    setTimeout(() => {
      getUrlFromTable();
    }, 2000);
  }
  timeDelay();
  setConfigTable();
  res.send("crone run succesfully");
});
app.post("/getdata", async (req, res) => {
  const url = req.body.link;
  const data = await puppy(url);
  res.send({
    data: data 
  });
});
app.post("/getUpdatedData", async (req, res) => {
  const url = req.body.link
  const xpath = req.body.xpath;
  // console.log(url,xpath)
  //  console.log("url"+url);
  //  console.log("xapth"+xpath);
  const data = await getUpdatedData(url,xpath);
    res.send({
      data: data,
    });
});


// console.log("abc")
// ERROR HANDLE


app.listen(PORT , console.log("listening on port "+PORT))
