import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Modal from "react-bootstrap/Modal";
import { Container, Form, Card } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "../scss/company.scss";
import "../utils/SvgInLine.css";
import {
  createCollection,
  getCollection,
  deleteCollections,
} from "../api/Index.js";
import { Link } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import AlertComponent from "../components/AlertComponent";

const MyCollection = () => {
  const [allCollection, setAllCollection] = useState([]);
  const [show, setShow] = useState(false);
  const [collectionName, setCollectionName] = useState();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  
  const { user } = UserAuth();
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const showAllCollections = async () => {
    const data = await getCollection({
      email: user?.email,
    });
    setAllCollection(data.data.data);
  };
  const deleteCollection = async (collection) => {
    // setShowAlert(true);
    var index = allCollection.indexOf(collection);
    if (index > -1) {
      allCollection.splice(index, 1);
      setAllCollection([...allCollection]);
    }
    const daata = await deleteCollections(collection._id);
    if (daata) {
      setMessage("delete collection " );
      setShowAlert(true)
      // <Alert>Hello</Alert>
    }
  };
  const createNewCollection = async (event) => {
    console.log("collectionName",collectionName);
    event.preventDefault();
    var temp = collectionName;
    temp = temp?.trim();
    if (temp == undefined || temp == "") {
      alert("collection name is required");
      return;
    }
    await createCollection({
      CollectionName: collectionName,
      email: user?.email,
    });
    showAllCollections();
    // setShowSuccess(true);
    setShow(false);
    setCollectionName();
  };

  useEffect(() => {
    
    if (user?.email) showAllCollections();
  }, [user]);
  useEffect(() => {
  //  if(showAlert==true)
  //  setShowAlert(false);
  }, [showAlert]);
  
  return (
    <div>
      <Container>
        <AlertComponent message={message} showAlert={showAlert} setShowAlert={setShowAlert}/>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Your collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={createNewCollection}>
              <InputComponent
                value={collectionName}
                setValue={setCollectionName}
                label={"Add new collection"}
                placeholderr={"Enter collection name"}
              />
              <Button type="submit " variant="primary">
                Add
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <h1>All Collections</h1>
        <br></br>
        <div className="grid">
          {allCollection &&
            allCollection.map((collection) => {
              return (
                <div key={collection._id}>
                  <div className="d-flex justify-content-center item ">
                    <Card className="item-company">
                      <Link to={"/collection/" + collection._id}>
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
                      </Link>
                      <Card.Body>
                        <Card.Title
                          style={{ textDecoration: "none"}}
                          className="text-center"
                        >
                          {collection.CollectionName}<DeleteIcon
                            onClick={() => {
                              deleteCollection(collection);
                            }}
                          />
                          
                        </Card.Title>
                        
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              );
            })}
          <Card className="h-100 item-company add-new" onClick={handleShow}>
            <Card.Body className="add-icon align-items-center d-flex justify-content-center">
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
        </div>
      </Container>
    </div>
  );
};

export default MyCollection;
