import axios from "../interceptor/interceptor";
const URL = "https://thingsofbrand.herokuapp.com"
// const URL = "http://localhost:8080";

const uploadSingleFileAPI = async (fileObject) => {
  const config = {
    header: { "Content-Type": "multipart/form-data" },
  };
  const { data } = await axios.post(URL + "/api/uploads", fileObject, config);
  return data;
};

const createBrandAPI = async (dataToSend) => {
  const data = {
    ...dataToSend,
    // url: URL + "/" + dataToSend.url,
  };
  // console.log(dataToSend)
  return await axios.post(URL + "/api/brands", data);
};

const sendBrandAPI = async () => {
  return await axios.get(URL + "/api/brands/");
};
const sendMyStuffAPI = async (email) => {
  return await axios.get(URL + "/api/Mystuff/" + email);
};
const deleteMyStuffAPI = async (id) => {
  return await axios.delete(URL + "/api/Mystuff/" + id);
};
const sendSearchAPI = async ({title = "" , email = "" , active = "1",description=""}) => {
  return await axios.get(URL + "/api/search?title=" + title+"&email="+email+"&active="+active+"&description="+description);
};
const sendMydeleteStuffAPI = async (email) => {
  return await axios.get(URL + "/api/deteteItems/" + email);
};
const restoreMyStuffAPI = async (id) => {
  return await axios.delete(URL + "/api/deteteItems/" + id);
};
const saveMyStuffAPI = async ({_id ="" , title = "" }) => {

  return await axios.put(URL + "/api/Mystuff?_id=" + _id+"&title="+title);
};
const storeAuthKey =  async (authdata)=>{
const data = {
  ...authdata
}

  return await axios.post(URL + "/api/storeKey",data);
}

const deleteAuthKey = async ({authKey="",email=""}) => {
  // console.log(authdata);  
    return await axios.delete(URL + "/api/deleteKey?authKey=" + authKey + "&email=" + email);
}

const setAuthKey =  async (email)=>{
  // console.log("email");
  // console.log(email);
  return await axios.get(URL + "/api/storeKey/"+email);
}



const getS3SignUrl = async (file ) => {
  const { url } = await fetch(URL + "/s3url").then(res => res.json())
  // console.log(file)

  // console.log(url)
  // const imageUrl = url.split('?')[0]
  // // console.log("urlimg"+imageUrl)
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })
return url;
  
};



export {
  getS3SignUrl,
  uploadSingleFileAPI,
  createBrandAPI,
  sendBrandAPI,
  sendMyStuffAPI,
  sendSearchAPI,
  deleteMyStuffAPI,
  sendMydeleteStuffAPI,
  restoreMyStuffAPI,
  saveMyStuffAPI,
  storeAuthKey,
  setAuthKey,
  deleteAuthKey
};
