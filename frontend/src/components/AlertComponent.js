import React, { useEffect, useState,useRef } from "react";
import Toast from "react-bootstrap/Toast";

const AlertComponent = ({message,showAlert,setShowAlert}) => {
    const show1 = useRef(false);
    // const [showAlert, setShowAlert] = useState(false);
    // useEffect(() =>{
    //     // setShowAlert(show);
    //     console.log("value of show : ",show);
    // },[show])
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
      
    </div>
  )
}

export default AlertComponent
