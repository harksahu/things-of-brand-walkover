import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "../scss/style.scss"
import { awsDataCall } from "../api/index.js"
import { async } from "@firebase/util";

const SvgInline = (props) => {
  const [svg, setSvg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    // console.log(props.url);
    // console.log(props?.url);
    var url = props?.url;
    // console.log(url);
    // props.url !== undefined && props.url !== "null"
    //   ? props.url
    //   : "/assets/picture.svg";
    fetch(`${url}?timestamp=${new Date().getTime()}`)
      .then((res) => res.text())
      .then((res) => {
        var svgToHe = res.toString();
        svgToHe = svgToHe?.replace("<svg ", `<svg id="${props.url}" `);
        setSvg(svgToHe);
        console.log(res);
        console.log(svgToHe);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(setIsErrored);
    // if (url) { setTimeout(callImage(url), 1000); }

  }, [props.url]);

  // const callImage = async (url) => {
  //   var data = await awsDataCall(url)
  //   // console.log(data?.data);
  //   setSvg(data?.data);
  //   setLoading(false);
  // }

  useEffect(() => { }, [svg]);

  return (
    <>
      {loading ? (
        <div className="pattern-square svgInline" >
          <div className="center-loader">
            <ClipLoader />
          </div>
        </div>

      ) : (
        <div
          className={`pattern-square svgInline svgInline--${isLoaded ? "loaded" : "loading"
            } ${isErrored ? "svgInline--errored" : ""}`}
          dangerouslySetInnerHTML={{ __html: svg }}
          offset="30%"
        ></div>
      )}
    </>
  );
};

export default SvgInline;
