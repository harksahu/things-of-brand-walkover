import axios from "../interceptor/interceptor";
// const URL = "https://thingsofbrand.herokuapp.com"
const URL = "http://localhost:8080";

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
    url: URL + "/" + dataToSend.url,
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
const saveMyStuffAPI = async (data) => {
  return await axios.put(URL + "/api/Mystuff/" + data);
};



const getS3SignUrl = async (file ) => {
  const { url } = await fetch(URL + "/s3url").then(res => res.json())
  console.log(file)

  console.log(url)
  const imageUrl = url.split('?')[0]
  console.log("urlimg"+imageUrl)
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })

  
};

// export async function getS3SignUrl(filename, filetype){
  // const headers = new Headers({ 'Content-Type': 'application/json'   
  //   });
  // const options = {
  // method: 'POST',
  // headers: headers, 
  // body: JSON.stringify({ fileName, fileType: fileType })
  //  };
//   const response = await fetch(`${baseUrl}/presignedurl`,    
//   options);       
//   const presignedUrl = await response.json();
//   return presignedUrl
// }


export {
  uploadSingleFileAPI,
  createBrandAPI,
  sendBrandAPI,
  sendMyStuffAPI,
  sendSearchAPI,
  deleteMyStuffAPI,
  sendMydeleteStuffAPI,
  restoreMyStuffAPI,
  saveMyStuffAPI,
  getS3SignUrl
};
