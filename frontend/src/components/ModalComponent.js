import React, {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {updateCollection} from "../api/Index.js"
import { UserAuth } from "../context/AuthContext";


function ModalComponent(props) {
    const [collection,setCollection] = useState("");
    const[id,setId] = useState("");
    const [logos,setLogos] = useState([]);
    const { user } = UserAuth();


    useEffect(() => {
        setCollection(props?.allcollection?.data?.data);
        setId(props?.id)
        setLogos(props?.allcollection?.data?.data)
      }, [props]);

      const createNewCollection = async (collection,logo_id) => {
        console.log("logos",collection)
        var allLogos = collection?.Logos
        allLogos.push(logo_id);
        console.log(collection?.Logos);
        const data = await updateCollection({
            _id:collection?._id,
            Logos:allLogos,
            email:user?.email
        })
        
      };
    
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
            
          {collection && collection?.map((collection,index)=>{
              return(
                  <>  
                  {console.log("jh",collection.Logos)}
                    <h5 onClick={()=>{createNewCollection(collection,id)}}>{index+1 + " "}{collection?.CollectionName}</h5>
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