import express from "express";
import cors from 'cors';
import path from "path";
import authKeyRouters from "./routers/AuthKeyRouters.js";
import connectDB from './services/mongodb_service.js';
import uploadRoutes from "./routers/UploadRouters.js";
import StuffRouters from "./routers/StuffRouters.js";
import MyStuffRouters from "./routers/MyStuffRouters.js";
import SearchRouters from "./routers/SearchRouters.js";
import MyStuffdeleteitemRouters from "./routers/MyStuffdeleteitemRouters.js";
import {generateUploadURL} from './services/s3.js';
import CollectionRouters from "./routers/CollectionRouters.js";
import CompanyRouters from "./routers/CompanyRouters.js";
import puppy from "./details_feacher/getData.js"
import getUpdatedData from "./details_feacher/gettingdata.js";
import {setConfigTable,getUrlFromTable} from "./details_feacher/getUrlFromTable.js";
import dotenv from 'dotenv'
import {getCompanyJson} from "./controllers/CompanyController.js";
import {getCollectionJson} from "./controllers/CollectionController.js";
import dns from "dns";
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
app.use('/api/stuff',StuffRouters);
app.use('/api/search',SearchRouters);
app.use('/api/MyStuff',MyStuffRouters);
app.use('/api/deteteItems',MyStuffdeleteitemRouters);
app.use('/api/storeKey',authKeyRouters);
app.use('/api/deleteKey',authKeyRouters);
app.use('/api/Collection',CollectionRouters);
app.use('/api/companies',CompanyRouters);

app.get('/s3url',async(req,res)=>{
    // console.log("file:-");
    // console.log(req)
    const url = await generateUploadURL()

    res.send({url});
})



app.get('/:domain/json',async(req,res)=>{

  // console.log("req");
  // console.log(req?.params?.domain);
  const data = await getCompanyJson(req?.params?.domain)
  console.log("data");
  console.log(data);
  res.send({data});
  // return data
})

app.get('/collection/:id/json',async(req,res)=>{

  // console.log("req");
  console.log(req?.params?.domain);
  const data = await getCollectionJson(req?.params?.id)
  // console.log("data");
  // console.log(data);
  res.send({data});
  // return data
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
  
  try {
    const url = req.body.link;
    const data = await puppy(url);
    // console.log(data);
  res.send({
    data: data 
  });
  } catch (error) {
    res.send({
      data: error,
    });
  }
});
app.post("/getUpdatedData", async (req, res) => {
 try {
  const url = req.body.url
  const xpath = req.body.xpath;
  // console.log(url,xpath)
  //  console.log("url"+url);
  //  console.log("xapth"+xpath);
  const data = await getUpdatedData(url,xpath);
    res.send({
      data: data,
    });
 } catch (error) {
  res.send({
    data: error,
  });
 }
});
app.post("/getUpdatedData", async (req, res) => {
  try {
   const url = req.body.url
   const xpath = req.body.xpath;
   // console.log(url,xpath)
   //  console.log("url"+url);
   //  console.log("xapth"+xpath);
   const data = await getUpdatedData(url,xpath);
     res.send({
       data: data,
     });
  } catch (error) {
   res.send({
     data: error,
   });
  }
 });






 app.post("/getDomainTXT", async (req, res) => {
  const url = req.body.link
  console.log(req.body);
  const xpath = req.body.xpath;
  try {
    dns.resolveTxt(url, ( error,record)=>{
      if (error) {
        console.log(error);
        res.send({
          error: error,
        });
      }
    else{
      res.send({
        data: record,
      });
    }
  
   })
  } catch (error) {
    
  }

});




// console.log("abc")
// ERROR HANDLE


app.listen(PORT , console.log("listening on port "+PORT))
