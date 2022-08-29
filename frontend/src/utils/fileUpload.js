import { async } from "@firebase/util";
import { uploadSingleFileAPI } from "../api";

const uploadSingleFileAndGetURL =async (fileObject)=>{
    const fileToUpload = new FormData();
    fileToUpload.append('image',fileObject)

    return await uploadSingleFileAPI(fileToUpload)

}

export {
    uploadSingleFileAndGetURL
}