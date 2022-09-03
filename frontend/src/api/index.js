import axios from "../interceptor/interceptor";
// const URL = "https://things-of-brand.herokuapp.com"
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
  return await axios.get(URL + "/api/brands");
};
const sendMyStuffAPI = async (email) => {
  return await axios.get(URL + "/api/Mystuff/" + email);
};
const deleteMyStuffAPI = async (id) => {
  return await axios.delete(URL + "/api/Mystuff/" + id);
};
const sendSearchAPI = async (text) => {
  return await axios.get(URL + "/api/search/" + text);
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
};
