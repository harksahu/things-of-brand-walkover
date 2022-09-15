import { vectorsAngle } from "canvg";
import React, { useEffect, useState } from "react";
import { Canvg, presets } from "canvg";
const SvgInline = (props) => {
  // console.log(props.url);

  const [svg, setSvg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    fetch(props.url)
      .then((res) => res.text())
      .then(setSvg)
      .catch(setIsErrored)
      .then(() => setIsLoaded(+true));
  }, [props.url]);


  // console.log(svg)
  return (
    <div
      className={`svgInline svgInline--${isLoaded ? "loaded" : "loading"} ${
        isErrored ? "svgInline--errored" : ""
      }`
    }
    id={props.url}
      dangerouslySetInnerHTML={{ __html: svg }}
      offset="30%"
      style={{
      }}
    >

    </div>
  );
};

export default SvgInline;
