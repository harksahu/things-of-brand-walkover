import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function DeleteComponent({show,setmodalshow,msg,...props}) {
    useEffect(()=>{
        // console.log(props)
    },[])
  return (
    <Modal show={show} closable="false"
       
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // {...props}
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Are you surely want to {msg}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          This action cannot be undone 
        </p>
      </Modal.Body>
      <Modal.Footer>        
         <Button variant="outline-dark" onClick={()=>{
            setmodalshow(false);

        }}>Close</Button>
        <Button onClick={()=>{
            // setDelete(true);
            
            setmodalshow(false);
            props.onSubmit();
        }}>{msg}</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default DeleteComponent;
