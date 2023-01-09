
import React, { useRef } from "react";

import Toast from "react-bootstrap/Toast";
import ToastContainer from 'react-bootstrap/ToastContainer';

const AlertComponent = ({message,showAlert,setShowAlert}) => {
    const show1 = useRef(false);
    // const [showAlert, setShowAlert] = useState(false);
    // useEffect(() =>{
    //     // setShowAlert(show);
    //     console.log("value of show : ",show);
    // },[show])
  return (
    <div>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          ref={show1}
          onClose={() => setShowAlert(false)}
          bg={'success'}
          show={showAlert}
          delay={3000}
          autohide
        >
          <Toast.Header>            
            <strong className="me-auto">Alert</strong>
            <small className="text-muted">Close</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default AlertComponent;