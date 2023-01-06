import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "../scss/style.scss"
// import PropTypes from 'prop-types';

const SvgInline = (props) => {
  const [svg, setSvg] = useState(null);

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


  useEffect(() => {
    var svg = document?.querySelector('svg');
    var box = svg?.getAttribute('viewBox');
    box?.split(/\s+|,/);
    box = svg?.viewBox?.baseVal;
    if (box) {

      props?.setViewBox({
        width: Math.round(box?.width),
        height: Math.round(box?.height)
      })
    }
  }, [svg]);

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
          className={`pattern-square svgInline svgInline--loaded ${isErrored ? "svgInline--errored" : ""}`}
          dangerouslySetInnerHTML={{ __html: svg }}
          offset="30%"
          id="largeImage"
        ></div>
      )}
    </>
  );
};

export default SvgInline;




// SvgInline.propTypes = {
//   props.url:  PropTypes.string

// };


