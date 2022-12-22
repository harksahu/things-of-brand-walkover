import React, { useState } from "react";
import {
  MdContentCopy
} from "react-icons/md";
import PropTypes from 'prop-types';

function CopyToClipboard({ color }) {
  const [value, setValue] = useState("Copy to clipboard");

  return (
    <>
      <div className="icon-copy">
        <MdContentCopy
          onClick={() => {
            let colorTemp = color;
            navigator.clipboard.writeText(colorTemp);
            setValue("Copied: " + colorTemp);
          }}
          onMouseOut={() => {
            setValue("Copy to clipboard");
          }}
        />
        <span className="tooltiptext1" id="myTooltip">
          {value}
        </span>
      </div>
    </>
  );
}

export default CopyToClipboard;






CopyToClipboard.propTypes = {
  color: PropTypes.string
};

