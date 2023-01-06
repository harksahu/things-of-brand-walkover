import React from "react";
import JSONPretty from 'react-json-pretty';



function JsonModel({ data, id, show }) {
    console.log(data);
    return (


        <div style={{ background: "#272822" }}>
            {
                show === "Collection" ? (
                    <p style={{ color: "#fd971f" }}>{`curl "https://thingsofbrand.com/collection/${id}/json" \
                    `}
                        <br />
                        {`-H "Authorization: Bearer YOUR_API_KEY"`}</p>
                ) : (<p style={{ color: "#fd971f" }}>{`curl "https://thingsofbrand.com/${id}/json" \
                `}
                    <br />
                    {`-H "Authorization: Bearer YOUR_API_KEY"`}</p>)
            }
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
