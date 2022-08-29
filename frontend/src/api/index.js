import axios from 'axios'
const URL = "http://localhost:5001"
const uploadSingleFileAPI =async (fileObject)=>{
    const config = {
        header:{"Content-Type":"multipart/form-data"}
    }
    const {data} = await axios.post(URL+"/api/uploads",fileObject,config);
    return data
}

export {
 uploadSingleFileAPI 
}