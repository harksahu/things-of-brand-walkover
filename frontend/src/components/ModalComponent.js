import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { updateCollection } from "../api/Index.js";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import {
  BsFillPlusCircleFill,
} from "react-icons/bs";
function ModalComponent(props) {
  const [collection, setCollection] = useState("");
  const [id, setId] = useState("");
  const [duplicateError, setDuplicateError] = useState(false);
  const { user } = UserAuth();
  useEffect(() => {
    setDuplicateError(false);
    setCollection(props?.allcollection?.data?.data);
    setId(props?.id);
  }, [props]);
  const createNewCollection = async (collection, logo_id) => {
    var allLogos = collection?.Logos;
    if (allLogos.includes(logo_id)) {
      setDuplicateError("Logos is already in the collection");
      return;
    } else {
      allLogos.push(logo_id);
    var temp =  props.variants
    temp[props.index]= "red"
    console.log(props.index);
    console.log(temp);
      props.setVariants([...temp]) ;
    }
    const data = await updateCollection({
      _id: collection?._id,
      Logos: allLogos,
      email: user?.email,
    });
    if (data) {
      setDuplicateError("Logo is added to the collection");
      props.setAddedCollection(true);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <h4 style={{width:"500%"}}> {duplicateError}</h4>
        <Link to="/collection">
        <BsFillPlusCircleFill style={{ fontSize: 40}} />
        </Link>
      </Modal.Header>
      <Modal.Body>
        {collection &&
          collection.map((collection) => {
            return (
              <div key={collection._id}>
                <div className="d-flex justify-content-center item ">
                  {/* <Link to={"/collection/" +collection._id}> */}
                  <Card
                    className="item-company"
                    onClick={() => {
                      createNewCollection(collection, id);
                    }}
                  >
                    <div
                      style={{ overflow: "auto" }}
                      className="img_size  pattern-square"
                    >
                      {collection?.logo[0]?.url !== undefined &&
                      collection?.logo[0]?.url !== "null" ? (
                        <img src={collection?.logo[0]?.url} alt="" />
                      ) : (
                        <img src="/assets/picture.svg" alt="" />
                      )}
                    </div>
                    <Card.Body>
                      <Card.Title
                        style={{ textDecoration: "none" }}
                        className="text-center"
                      >
                        {collection.CollectionName}
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