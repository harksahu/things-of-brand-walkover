import React, {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalComponent(props) {
    const [collection,setCollection] = useState("");
    const[url,setUrl] = useState("");

    useEffect(() => {
        setCollection(props?.allcollection?.data?.data);
        setUrl(props?.url)
      }, []);
    
  return (
    <Modal
      {...props}    
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          All Collections
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
        {console.log(url)}

          {collection && collection?.map((collectionn,index)=>{
            return(
                <>
                
                    <h5>{index+1 + " "}{collectionn?.CollectionName}</h5>
                    {/* <img src={url} alt="" /> */}
                </>
            );
          })
        }
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalComponent;