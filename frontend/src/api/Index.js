import axios from "../interceptor/Intercepter.js";
// const URL = "https://thingsofbrand.com";

const URL = "http://localhost:8080";

const createBrandAPI = async (dataToSend) => {
  const data = {
    ...dataToSend,
  };
  return await axios.post(URL + "/api/stuff", data);
};

const createProfile = async (dataToSend) => {
  const data = {
    ...dataToSend,
  }
  return await axios.post(URL + "/api/companies", data);
};

const getProfileDetails = async ({ email = "", domain = "", name = "", searchfrom = "false", _id = "" }) => {
  var data = await axios.get(URL + "/api/companies?email=" + email + "&domain=" + domain + "&name=" + name + "&searchfrom=" + searchfrom + "&_id=" + _id);
  return data
}
const getProfileandLogoDetails = async ({ email = "", domain = "", name = "", searchfrom = "false", _id = "" }) => {
  const title = "";
  const active = "1";
  const description = "";
  const id = "";
  var data = await axios.get(URL + "/api/companies?email=" + email + "&domain=" + domain + "&name=" + name + "&searchfrom=" + searchfrom + "&_id=" + _id);

  const logos = await axios.get(URL + "/api/search?title=" + title + "&email=" + email + "&active=" + active + "&description=" + description + "&_id=" + id + "&domain=" + data?.data?.data[0]._id);

  const dataAndLogo = { ...data?.data?.data[0], allogosdata: [logos?.data?.data] };


  return dataAndLogo;

}



const searchBrandApi = async (id) => {
  return await axios.get(URL + "/api/stuff/" + id);
}


const updateProfileFields = async (dataToSend) => {

  const data = {
    ...dataToSend
  }

  return await axios.put(URL + "/api/companies", data);
}

const getFontList = async () => {
  const data = await axios.get("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBZ2tyYXkXRSFJ4AlFgyrASHN7yXJr7a9c");
  return data
};
const sendBrandAPI = async () => {
  return await axios.get(URL + "/api/stuff/");
};
const sendMyStuffAPI = async (email) => {
  return await axios.get(URL + "/api/Mystuff/" + email);
};
const deleteMyStuffAPI = async (id) => {
  return await axios.delete(URL + "/api/Mystuff/" + id);
};
const sendSearchAPI = async ({ title = "", email = "", active = "", description = "", _id = "", domain = "" }) => {
  return await axios.get(URL + "/api/search?title=" + title + "&email=" + email + "&active=" + active + "&description=" + description + "&_id=" + _id + "&domain=" + domain);
};

const getCompanyDetails = async (id) => {
  return await axios.get(URL + "/api/companies/" + id);
}

const sendMydeleteStuffAPI = async (email) => {
  return await axios.get(URL + "/api/deteteItems/" + email);
};
const restoreMyStuffAPI = async (id) => {
  return await axios.delete(URL + "/api/deteteItems/" + id);
};
const saveMyStuffAPI = async ({ _id = "", title = "" }) => {

  return await axios.put(URL + "/api/Mystuff?_id=" + _id + "&title=" + title);
};






// Authkey 


//Store Authkey
const storeAuthKey = async (authdata) => {
  const data = {
    ...authdata
  }

  return await axios.post(URL + "/api/storeKey", data);
}


//Delete Authkey
const deleteAuthKey = async ({ authKey = "", email = "" }) => {
  return await axios.delete(URL + "/api/deleteKey?authKey=" + authKey + "&email=" + email);
}


//get AuthKey
const setAuthKey = async (email) => {

  return await axios.get(URL + "/api/storeKey/" + email);
}




// get domain TXT values
const getTXT = async (link) => {
  const data = {
    link
  }
  return await axios.post(URL + "/getDomainTXT", data);
}








//AWS
const getS3SignUrl = async (file) => {
  const { url } = await fetch(URL + "/s3url").then(res => res.json())
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "image/svg+xml"
    },
    body: file
  })
  return url;

};




//collections

//create collection
const createCollection = async (dataToSend) => {
  const data = {
    ...dataToSend,
  }
  return await axios.post(URL + "/api/Collection", data);
};

//update collection
const updateCollection = async (dataToSend) => {
  const data = {
    ...dataToSend,
  }
  return await axios.put(URL + "/api/Collection", data);
};

//get collection data
const getCollection = async ({ _id= "" , email=""}) => {

  return await axios.get(URL + "/api/Collection?CollectionName=" + _id + "&email=" + email);
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
  getCompanyDetails,
  getProfileandLogoDetails,
  createCollection,
  getCollection,
  updateCollection
};
