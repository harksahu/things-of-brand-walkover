import React, { useState ,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteComponent({showB,setShowB}) {
 const [show, setShow] = useState(true);
  const handleClose = () => {setShow(false);
    setShowB(false);
}
//   const handleShow = () => setShow(true);
useEffect(() => {
setShow(showB);
}, [showB])

  return (
    <>
       <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to delete !! </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
}
export default DeleteComponent;