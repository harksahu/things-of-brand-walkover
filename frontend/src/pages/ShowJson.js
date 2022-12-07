import React, { useEffect, useState } from "react";
import {
    getProfileandLogoDetails
  } from "../api/index.js";
  import { Link, useNavigate, useParams } from "react-router-dom";
function ShowJson()
{
    
    const title = useParams();
    const [result, setResult] = React.useState();
    const getAlldata = async () => {
        const fresult = await getProfileandLogoDetails({
          domain: title.title,
          searchfrom: true,
        });
        console.log("fresult",fresult);
        setResult(JSON.stringify(fresult));
    }
    useEffect(() => {
        // console.log("title = ",title);
         getAlldata();
   },[]);
   console.log("in show json");
   console.log("title = ",title);
   return(
    <>
    <p>"hello"</p>
    <div>
    {result}
    </div>
    </>
   )
} 

export default ShowJson;