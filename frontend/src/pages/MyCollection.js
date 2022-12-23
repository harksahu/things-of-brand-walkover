import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Modal from "react-bootstrap/Modal";
import { Container, Form, Card } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import "../scss/company.scss";
import "../utils/SvgInLine.css";
import { createCollection, getCollection } from "../api/Index.js";
import { Link} from "react-router-dom";
const MyCollection = () => {
  const [allCollection, setAllCollection] = useState([]);
  const [show, setShow] = useState(false);
  const [collectionName, setCollectionName] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = UserAuth();
  const handleClose = () => {
    setShow(false);
    setShowSuccess(false);
}
  const handleShow = () => setShow(true);
  const showAllCollections = async () => {
    const data = await getCollection({
      email: user?.email,
    });
    setAllCollection(data.data.data);
  };
  const createNewCollection = async () => {
    var temp = collectionName;
    temp = temp.trim();
    if (temp == undefined || temp == "") {
      alert("collection name is required");
      return;
    }
    await createCollection({
      CollectionName: collectionName,
      email: user?.email,
    });
    showAllCollections();
    setShowSuccess(true);
    setShow(false);
  };
  useEffect(() => {
    if (user?.email) 
    showAllCollections();
  }, [user]);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Your collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            {showSuccess&&<Form.Label>Collection Created</Form.Label>}
            <Form.Control
              type="domain"
              placeholder="Enter collection name"
              list="doaminBrowsers"
              autoComplete="off"
              name="myBrowser"
              id="domain"
              onChange={(e) => {
                setCollectionName(e.target.value);
              }}
            />
            <br></br>
            <Button
              variant="primary"
              onClick={() => {
                createNewCollection();
              }}
            >
              Next
            </Button>
          </Form.Group>
        </Modal.Body>
      </Modal>
      <Container>
            <h1>All Collections</h1><br></br>
        <div className="grid">
          {allCollection &&
            allCollection.map((collection) => {
              return (
                <div key={collection._id}>
                    
                  <div
                    className="d-flex justify-content-center item "
                  >
                    <Link to={"/collection/" +collection._id}>
                      <Card className="item-company">
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
                          >{collection.CollectionName}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
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
