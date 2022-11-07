import React, { useRef } from "react";
import JoiditEditer from "jodit-react";

const RichtextEditor = ({ guidlines, setGuidlines }) => {
  const editor = useRef(null);

  return (
    <JoiditEditer
      ref={editor}
      value={guidlines}
      onChange={(content) => setGuidlines(content)}
    />
  );
};

export default RichtextEditor;
