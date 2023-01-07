import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const config = {
  buttons: ["bold", "italic"],
  "toolbar": false,
  "showCharsCounter": false,
  "showWordsCounter": false,
  "showXPathInStatusbar": false
};

const RichTextEditor = ({ guidlines ,setGuidlines,tabIndex }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={guidlines}
      config={config}
      tabIndex={tabIndex}
      onChange={(newContent) => setGuidlines(newContent)}
    />
  );
};

export default RichTextEditor;