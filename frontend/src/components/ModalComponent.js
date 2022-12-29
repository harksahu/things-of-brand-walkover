import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { updateCollection, createCollection } from "../api/Index.js";
import { UserAuth } from "../context/AuthContext";
import { BsFillPlusCircleFill } from "react-icons/bs";
import InputComponent from "./InputComponent.js";
import AlertComponent from "./AlertComponent.js";

function ModalComponent(props) {
  const [collection, setCollection] = useState("");
  const [id, setId] = useState("");
  const [duplicateError, setDuplicateError] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [showComponent, setShowComponent] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
 
  const { user } = UserAuth();
  useEffect(() => {
    setShowComponent(false);
    setCollection(props?.allcollection?.data?.data);
    setId(props?.id);
  }, [props]);

  useEffect(() => {
    if(!user?.email)
    {
      setShowAlert(true);
      setMessage("You have to login first...");
    }
    setDuplicateError(false);
  }, []);

  const createCollections = async (collectionName) => {
    const ans = await createCollection({
      CollectionName: collectionName,
      email: user.email,
      Logos: [],
    });
    if (ans) {
      setShowAlert(true);
      setMessage("collection created successfully");
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
<>
    
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton>
        {/* <Link to="/collection"> */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {showComponent && (
            <div style={{ marginRight: "250px" }}>
              <InputComponent
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
          )}

          {props?.allcollection?.data?.data?.length ? (
            <BsFillPlusCircleFill
              size="50px"
              onClick={() => {
                setShowComponent(true);
              }}
            />
          ) : (
            ""
          )}
          {/* </Link> */}
        </div>
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
                  <div>
                    {/* <Link to={"/collection/" +collection._id}> */}

                    <Card
                      style={{ height: "7.5rem", width: "8rem" }}
                      className="item-company"
                      onClick={() => {
                        createNewCollection(collection, id);
                      }}
                    >
                      {collection?.logo[0]?.url !== undefined &&
                      collection?.logo[0]?.url !== "null" ? (
                        <img
                          style={{ height: "4rem", width: "5rem" }}
                          src={collection?.logo[0]?.url}
                          alt=""
                        />
                      ) : (
                        <img
                          style={{ height: "4rem", width: "5rem" }}
                          src="/assets/picture.svg"
                          alt=""
                        />
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
      </Modal.Body>
      <Modal.Footer>
        {duplicateError && !showComponent && <h4> {duplicateError}</h4>}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        <AlertComponent
        message={message}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />  
   </>
  );
}
export default ModalComponent;
