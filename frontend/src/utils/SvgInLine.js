import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "../scss/style.scss"
import { async } from "@firebase/util";

const SvgInline = (props) => {
  const [svg, setSvg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    var url = props?.url;
    fetch(`${url}?timestamp=${new Date().getTime()}`)
      .then((res) => res.text())
      .then((res) => {
        var svgToHe = res.toString();
        svgToHe = svgToHe?.replace("<svg ", `<svg id="${props.url}" `);
        setSvg(svgToHe);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(setIsErrored);

  }, [props.url]);


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
          id="largeImage"
        ></div>
      )}
    </>
  );
};

export default SvgInline;