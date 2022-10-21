import React, { useRef } from 'react';
import JoiditEditer from 'jodit-react';



const RichtextEditor = ({setGuidlines}) =>{
    const editor =useRef(null);

    return (<JoiditEditer ref={editor} onChange={content => setGuidlines(content)}/>);
}

export default RichtextEditor;