import React,{useState} from "react";
import JSONPretty from 'react-json-pretty';
import {setAuthKey} from '../api/Index.js'
import { UserAuth } from "../context/AuthContext";


function JsonModel({ data, id, show }) {
    const [AuthKey,SetKey] = useState("YOUR_API_KEY")
    const [AuthBut,SetBut] = useState("Show AuthKey")
    const {user} = UserAuth()
    return (


        <div style={{ background: "#272822" }}>
            {
                show === "Collection" ? (
                    <p style={{ color: "#fd971f" }}>{`curl "https://thingsofbrand.com/collection/${id}/json" \
                    `}
                        <br />
                        {`-H "Authorization: ${AuthKey}"`}</p>
                ) : (<p style={{ color: "#fd971f" }}>{`curl "https://thingsofbrand.com/${id}/json" \
                `}
                    <br />
                    {`-H "Authorization:  ${AuthKey}"`}</p>)
            }
            <button onClick={async()=>{
                if(AuthKey === "YOUR_API_KEY"){
                    const key =  await setAuthKey(user.email);
                    if(key?.data?.data[0]?.authKey)
                        SetKey(key?.data?.data[0]?.authKey);
                    else
                    SetKey("key is not Created");
                    SetBut("hide AuthKey")
                
                }
                else{
                    SetKey("YOUR_API_KEY")
                    SetBut("Show AuthKey")
                }
                

            }}>{AuthBut}</button>
            <JSONPretty
                mainStyle='line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;'
                errorStyle='line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;'
                keyStyle='color:#f92672;'
                stringStyle='color:#fd971f;'
                valueStyle='color:#a6e22e;'
                booleanStyle='color:#ac81fe;'
                id="json-pretty"
                data={data} />
        </div >
    )
}
export default JsonModel;
