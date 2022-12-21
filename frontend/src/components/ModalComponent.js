import React, { useState, useEffect } from "react";
import {Button,Card} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { updateCollection } from "../api/Index.js";
import { UserAuth } from "../context/AuthContext";
import { Link} from "react-router-dom";
import { style } from "@mui/system";

function ModalComponent(props) {
  const [collection, setCollection] = useState("");
  const [id, setId] = useState("");
  const [logos, setLogos] = useState([]);
  const [duplicateError, setDuplicateError] = useState(false);
  const { user } = UserAuth();






  useEffect(() => {
    setCollection(props?.allcollection?.data?.data);
    setId(props?.id);
    setLogos(props?.allcollection?.data?.data);
    setDuplicateError(false);
  }, [props]);

  const createNewCollection = async (collection, logo_id) => {
    console.log("logos", collection);

    var allLogos = collection?.Logos;
    if(allLogos.includes(logo_id)){
      setDuplicateError("Logos is already in the collection")
      return
    }
    else{
      allLogos.push(logo_id);
    }
    
    const data = await updateCollection({
      _id: collection?._id,
      Logos: allLogos,
      email: user?.email,
    });
    if (data) {
      setDuplicateError("Logo is added to the collection")
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
       <h1> {duplicateError}</h1>
      </Modal.Header>
      <Modal.Body>

           {collection &&
            collection.map((collection) => {
              return (
                <div key={collection._id}>
                  <div
                    className="d-flex justify-content-center item "
                  >
                    {/* <Link to={"/collection/" +collection._id}> */}
                      <Card className="item-company" onClick={() => {
                    createNewCollection(collection, id);
                  }}>
                        <div
                          style={{ overflow: "auto" }}
                          className="img_size  pattern-square"
                        > 
                        <img src="/assets/picture.svg" alt="" />
                        </div>
                        <Card.Body>
                          <Card.Title
                            style={{ textDecoration: "none" }}
                            className="text-center"
                          >{collection.CollectionName}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    {/* </Link> */}
                  </div>
                </div>
              );
            })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
