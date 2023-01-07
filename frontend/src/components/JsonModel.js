import React,{useState} from "react";
import JSONPretty from 'react-json-pretty';
import {setAuthKey} from '../api/Index.js'
import { UserAuth } from "../context/AuthContext";


function JsonModel({ data, id, show }) {
    const [AuthKey,SetKey] = useState("YOUR_API_KEY")
    const [AuthBut,SetBut] = useState("Show API key")
    const {user} = UserAuth()
    return (        
        <div>
            <div className="mb-1">REQUEST</div>
            <div className="code-preview">
                {
                    show === "Collection" ? (
                        <pre style={{color: "#e08d00"}}>
                        {
                        `curl "https://thingsofbrand.com/collection/${id}/json"
-H "Authorization: ${AuthKey}"`}
                        </pre>
                    ) : (
                        <pre style={{color: "#e08d00"}}>{
                            `curl "https://thingsofbrand.com/${id}/json"
-H "Authorization:  ${AuthKey}"`
                            }
                        </pre>
                    )
                }
            </div>
            <a href="javascript:void(0)" onClick={async()=>{
                if(AuthKey === "YOUR_API_KEY"){
                    const key =  await setAuthKey(user.email);
                    if(key?.data?.data[0]?.authKey)
                        SetKey(key?.data?.data[0]?.authKey);
                    else
                    SetKey("key is not Created");
                    SetBut("Hide API key")
                
                }
                else{
                    SetKey("YOUR_API_KEY")
                    SetBut("Show API key")
                }
                

            }}>{AuthBut}</a>
            <div className="mb-1 mt-4">RESPONSE</div>
            <JSONPretty
                mainStyle='line-height:1.3;color:#66d9ef;background:#222;overflow:auto;'
                errorStyle='line-height:1.3;color:#66d9ef;background:#222;overflow:auto;'
                keyStyle='color:#01a9db;'
                stringStyle='color:#e08d00;'
                valueStyle='color:#e08d00;'
                booleanStyle='color:#ac81fe;'
                id="json-pretty"
                className="code-preview"
                data={data} />
        </div >
    )
}
export default JsonModel;
