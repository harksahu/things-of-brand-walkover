import React, { useEffect, useState } from "react";
const SvgInline = (props) => {
  const [svg, setSvg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  useEffect(() => {
    // console.log(props.url);
    var url =
      props.url !== undefined && props.url !== "null"
        ? props.url
        : "/assets/picture.svg";
    fetch(url)
      .then((res) => res.text())
      .then((res) => {
        var svgToHe = res.toString();
        svgToHe = svgToHe?.replace("<svg ", `<svg id="${props.url}" `);
        setSvg(svgToHe);
      })
      .catch(setIsErrored);
  }, [props.url]);

  useEffect(() => {}, [svg]);

  return (
    <div
      className={`pattern-square svgInline svgInline--${
        isLoaded ? "loaded" : "loading"
      } ${isErrored ? "svgInline--errored" : ""}`}
      dangerouslySetInnerHTML={{ __html: svg }}
      offset="30%"
    ></div>
  );
};

export default SvgInline;
