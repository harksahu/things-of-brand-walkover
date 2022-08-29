import React, { useState } from "react";
import { UserAuth } from '../context/AuthContext';
import { uploadSingleFileAndGetURL } from "../utils/fileUpload";

const Addfile = () => {
  const { user } = UserAuth();

  const [file, setFile] = useState([]);
  const [title, setTitle] = useState([]);
const onSubmitClick = ()=>{
  console.log("IN onSubmitClick");
  const fileUrl = uploadSingleFileAndGetURL(file);
  console.log(fileUrl);
}
  return (
    <div>
      <div className="w-full place-items-center text-center max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          id="image_upload"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="File name"
            >
              Title name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setTitle({ ...title, username: e.target.value })}
              id="title"
              type="text"
              placeholder="Title name"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Upload file
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => {
                debugger
                setFile(e.target.files[0]);
              }}
              id="image"
              type="file"
              // accept=".svg"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onSubmitClick}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <h1>email:- {user?.email}</h1>

    </div>
  );
};

export default Addfile;
