import React, { useRef } from 'react';
import JoiditEditer from 'jodit-react';



const RichtextEditor = ({setValue}) =>{
    const editor =useRef(null);

    return (<JoiditEditer ref={editor} onChange={content => setValue(content)}/>);
}

export default RichtextEditor;