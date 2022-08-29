import axios from 'axios'
const URL = "http://localhost:8080"
const uploadSingleFileAPI =async (fileObject)=>{
    const config = {
        header:{"Content-Type":"multipart/form-data"}
    }
    const {data} = await axios.post(URL+"/api/uploads",fileObject,config);
    return data
}

const createBrandAPI = async(dataToSend)=>{
const data = {
...dataToSend,
Url:URL+"/"+dataToSend.Url,
}
return await axios.post(URL+"/api/brands",data); 
}


const sendBrandAPI = async()=>{
    return await axios.get(URL+"/api/brands"); 
    }




export {
 uploadSingleFileAPI ,
 createBrandAPI,
 sendBrandAPI
}