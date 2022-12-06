import React, { useEffect, useState } from "react";
const SvgInline = (props) => {
  // console.log(props);

  const [svg, setSvg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  useEffect(() => {
    fetch(props.url)
    .then((res) => res.text())
    .then((res)=>{
      var svgToHe = res.toString();
      svgToHe = svgToHe?.replace("<svg ", `<svg id="${props.url}" `)
      setSvg(svgToHe);
    })
    .catch(setIsErrored)
  }, [props.url]);

  useEffect(() => {
  // console.log(svg);
  }, [svg]);

  return (
    <div
      className={`svgInline svgInline--${isLoaded ? "loaded" : "loading"} ${
        isErrored ? "svgInline--errored" : "" 
      }`}
      // id={props.url}
      dangerouslySetInnerHTML={{ __html: svg }}
      offset="30%"
      style={{}}
    />
  );
};

export default SvgInline;
