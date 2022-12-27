import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { updateCollection, createCollection } from "../api/Index.js";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import InputComponent from "./InputComponent.js";
import { width } from "@mui/system";

function ModalComponent(props) {
  const [collection, setCollection] = useState("");
  const [id, setId] = useState("");
  const [logos, setLogos] = useState([]);
  const [duplicateError, setDuplicateError] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [showComponent, setShowComponent] = useState(false);
  const { user } = UserAuth();
  useEffect(() => {

    setShowComponent(false);
    setCollection(props?.allcollection?.data?.data);
    setId(props?.id);
    setLogos(props?.allcollection?.data?.data);
  }, [props]);

  useEffect(() => {
    setDuplicateError(false);
  }, []);

  const createCollections = async (collectionName) => {

    const ans = await createCollection({
      CollectionName: collectionName,
      email: user.email,
      Logos: [],
    });
    if (ans) {

      alert("collection created successfully");
    }


  };

  const createNewCollection = async (collection, logo_id) => {
    var allLogos = collection?.Logos;
    if (allLogos.includes(logo_id)) {
      setDuplicateError("Logos is already in the collection");
      return;
    } else {
      allLogos.push(logo_id);
      var temp = props.variants;
      temp[props.index] = "red";

      props.setVariants([...temp]);
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


      <Modal.Header closeButton>
        {/* <Link to="/collection"> */}
        {showComponent ? (
          <div style={{ marginRight: "250px" }}>
            <InputComponent
              // label={"Collection Name"}
              setValue={setCollectionName}
              valuee={collectionName}
              placeholderr={"Enter Collection name"}
            />
            <Button
              onClick={() => {
                props.onHide();
                createCollections(collectionName);
              }}
            >
              Submit
            </Button>
          </div>
        ) : (
          <h4 style={{ width: "500%" }}> {duplicateError}</h4>
        )}
        {props?.allcollection?.data?.data?.length ? (
          <BsFillPlusCircleFill
            size="50px"
            // style={{ margin: "-150px 5px" }}
            onClick={() => {
              setShowComponent(true);
            }}
          />
        ) : (
          ""
        )}
        {/* </Link> */}
      </Modal.Header>
      <Modal.Body>
        {!props?.allcollection?.data?.data?.length ? (
          <Card
            onClick={() => {
              setShowComponent(true);
            }}
            className="h-100 item-company add-new d-flex"
          >
            <Card.Body className="add-icon align-items-center justify-content-center">
              <Card.Title className="text-center">
                <BsFillPlusCircleFill style={{ fontSize: 40 }} />
              </Card.Title>
            </Card.Body>
            <Card.Body>
              <Card.Title className="text-center">
                Add New Collection
              </Card.Title>
            </Card.Body>
          </Card>
        ) : (
          ""
        )}
        <div className="d-flex item m-3" style={{ overflow: "scroll" }}>
          {collection &&
            collection.map((collection) => {
              return (
                <div key={collection._id} className="m-3">
                  <div >
                    {/* <Link to={"/collection/" +collection._id}> */}

                    <Card style={{ height: "7.5rem", width: "8rem" }}
                      className="item-company"
                      onClick={() => {
                        createNewCollection(collection, id);
                      }}
                    >

                      {collection?.logo[0]?.url !== undefined &&
                        collection?.logo[0]?.url !== "null" ? (
                        <img style={{ height: "4rem", width: "5rem" }} src={collection?.logo[0]?.url} alt="" />
                      ) : (
                        <img style={{ height: "4rem", width: "5rem" }} src="/assets/picture.svg" alt="" />
                      )}
                  {/* </div> */}
                  <div style={{ textalign: "center", paddingLeft: "18%" }}>

                    {collection.CollectionName}
                  </div>
                  {/* <Card.Body>

                      <Card.Title 
                        style={{ textDecoration: "none" , paddingRight:"65%"  }}
                        className="text-center"
                      >
                        {collection.CollectionName}
                      </Card.Title>
                    </Card.Body> */}
                </Card>
                  </div>
        {/* </Link> */}
      </div>

      );
            })}
    </div>
      </Modal.Body >
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
    </Modal >
  );
}
export default ModalComponent;
