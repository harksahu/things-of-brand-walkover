import axios from "../interceptor/interceptor";
const URL = "https://thingsofbrand.com";

// const URL = "http://localhost:8080";


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

const getProfileDetails = async ({email="",domain="",name="",searchfrom="false",_id=""}) => {
  console.log(_id);
  return await axios.get(URL + "/api/profile?email="+email+"&domain="+domain+"&name="+name+"&searchfrom="+searchfrom+"&_id="+_id);
}


const searchBrandApi = async (id) => {
  return await axios.get(URL + "/api/brands/"+id);
}


const updateProfileFields = async(dataToSend) => {
  console.log(dataToSend);
  const data = {
    ...dataToSend
  }

  return await axios.put(URL + "/api/profile", data);

}

const getFontList = async () => {
  const data = await axios.get("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBZ2tyYXkXRSFJ4AlFgyrASHN7yXJr7a9c");
  return data
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
const sendSearchAPI = async ({title = "" , email = "" , active = "",description="",_id="",domain=""}) => {
  return await axios.get(URL + "/api/search?title=" + title+"&email="+email+"&active="+active+"&description="+description+"&_id=" + _id+ "&domain=" + domain);
};

const getCompanyDetails = async (id) => {
  console.log(id)
  return await axios.get(URL + "/api/profile/" +  id );
}

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
    return await axios.delete(URL + "/api/deleteKey?authKey=" + authKey + "&email=" + email);
}

const setAuthKey =  async (email)=>{

  return await axios.get(URL + "/api/storeKey/"+email);
}
const getTXT =  async (link)=>{
  const data = {
    link
  }
  return await axios.post(URL + "/getDomainTXT",data);
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
  getTXT,
  getFontList,
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
  updateProfileFields,
  getCompanyDetails
};
