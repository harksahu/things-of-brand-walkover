import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const config = {
  buttons: ["bold", "italic"],
  "toolbar": false,
  "showCharsCounter": false,
  "showWordsCounter": false,
  "showXPathInStatusbar": false
};

const RichTextEditor = ({ guidlines, setGuidlines, tabIndex, type, index }) => {
  const editor = useRef(null);

  const setSectionValue = (value) => {
    {
      const tempCount = guidlines;
      tempCount[index].textValue = value;
      setGuidlines([...tempCount]);
    }
  }
  return (
    <JoditEditor
      ref={editor}
      value={type ? guidlines[index].textValue:guidlines}
      config={config}
      tabIndex={tabIndex}
      onChange={(newContent) => (type ? (setSectionValue( newContent)) : setGuidlines(newContent))}
    />
  );
};

export default RichTextEditor;