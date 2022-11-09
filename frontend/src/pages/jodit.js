import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const config = {
  buttons: ["bold", "italic"],
  "toolbar": false
};

const RichTextEditor = ({ guidlines ,setGuidlines }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={guidlines}
      config={config}
      tabIndex={1}
        // onBlur={(newContent) => setGuidlines(newContent)}
      onChange={(newContent) => setGuidlines(newContent)}
    />
  );
};

export default RichTextEditor;