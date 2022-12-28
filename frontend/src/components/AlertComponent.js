import React, { useRef } from "react";
import Toast from "react-bootstrap/Toast";
import Child from "./child";

const AlertComponent = ({message,showAlert,setShowAlert}) => {
    const show1 = useRef(false);
    
    const inputRef = useRef();

    const clearForm = () => {
      inputRef.current.value = ''
    }
  return (
    <div>
        <Toast
            ref={show1}
          onClose={() => setShowAlert(false)}
          show={showAlert}
          delay={3000}
          autohide
        >
          <Toast.Header>{message}</Toast.Header>
        </Toast>
      
      <Child ref={inputRef}/>
      <button onClick={() => inputRef.current.xyzCall()}>x</button>
        {/* <input ref={inputRef}/> */}
    </div>
  )
}

export default AlertComponent
