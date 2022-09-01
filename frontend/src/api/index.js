import axios from '../interceptor/interceptor'
const URL = "https://things-of-brand.herokuapp.com"
const uploadSingleFileAPI =async (fileObject)=>{
    const config = {
        header:{"Content-Type":"multipart/form-data"}
    }
    const {data} = await axios.post(URL+"/api/uploads",fileObject,config);
    return data
}

const createBrandAPI = async(dataToSend)=>{
const data = {
...dataToSend
}
// console.log(dataToSend)
return await axios.post(URL+"/api/brands",data); 
}


const sendBrandAPI = async()=>{
    return await axios.get(URL+"/api/brands"); 
    }
const sendMyStuffAPI = async(email)=>{
    return await axios.get(URL+"/api/Mystuff/"+email); 
    }




export {
 uploadSingleFileAPI ,
 createBrandAPI,
 sendBrandAPI,
 sendMyStuffAPI
}