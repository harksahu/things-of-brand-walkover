import axios from "../interceptor/interceptor";
// const URL = "https://thingsofbrand.com";

const URL = "http://localhost:8080";


// const uploadSingleFileAPI = async (fileObject) => {
//   const config = {
//     header: { "Content-Type": "multipart/form-data" },
//   };
//   const { data } = await axios.post(URL + "/api/uploads", fileObject, config);
//   return data;
// };

const createBrandAPI = async (dataToSend) => {
  const data = {
    ...dataToSend,
    // url: URL + "/" + dataToSend.url,
  };
  console.log(dataToSend)
  return await axios.post(URL + "/api/brands", data);
};

const createProfile   = async (dataToSend) => {
  const data = {
    ...dataToSend,
  }
  return await axios.post(URL + "/api/profile", data);
};

const getProfileDetails = async (email) => {
  return await axios.get(URL + "/api/profile/"+email);
}
const searchBrandApi = async (id) => {
  return await axios.get(URL + "/api/brands/"+id);
}


const updateProfileFields = async({name="",aboutus="",links="",domain="",guidlines="",fontSize="",PrimaryColors="",secondaryColors="",backgroundColors="",email=""}) => {
  // let link = links.split(",");
// const data = {
//   ...dataToSend
// }
// console.log(data)
// console.log(data.links)
  // console.log("name=" + name + "&aboutus=" + aboutus + "&links=" + link + "&domain=" + domain + "&guidlines=" + guidlines + "&fontSize=" + fontSize + "&PrimaryColors="+ PrimaryColors+ "&secondaryColors=" + secondaryColors + "&backgroundColors=" + backgroundColors + "&email=" + email)
  return await axios.put(URL + "/api/profile?name=" + name + "&aboutus=" + aboutus + "&links=" + links + "&domain=" + domain + "&guidlines=" + guidlines + "&fontSize=" + fontSize + "&PrimaryColors="+ PrimaryColors+ "&secondaryColors=" + secondaryColors + "&backgroundColors=" + backgroundColors + "&email=" + email);
  // return await axios.put(URL + "/api/profile?data="+data);
}

const sendBrandAPI = async () => {
  return await axios.get(URL + "/api/brands/");
};
const sendMyStuffAPI = async (email) => {
  return await axios.get(URL + "/api/Mystuff/" + email);
};
const deleteMyStuffAPI = async (id) => {
  return await axios.delete(URL + "/api/Mystuff/" + id);
};
const sendSearchAPI = async ({title = "" , email = "" , active = "",description="",_id=""}) => {
  return await axios.get(URL + "/api/search?title=" + title+"&email="+email+"&active="+active+"&description="+description+"&_id=" + _id);
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
  searchBrandApi,
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
  deleteAuthKey,
  createProfile,
  getProfileDetails,
  updateProfileFields
};
