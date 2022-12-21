import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Modal from "react-bootstrap/Modal";
import { Container, Form, Card } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import "../scss/company.scss";
import "../utils/SvgInLine.css";
import CompanyCard from "../components/CompanyCard.js";
import { createCollection, getCollection } from "../api/Index.js";
import { Link} from "react-router-dom";
const MyCollection = () => {
  const [allCollection, setAllCollection] = useState([]);
  const [show, setShow] = useState(false);
  const [collectionName, setCollectionName] = useState();
  const { user } = UserAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const showAllCollections = async (req, res) => {
    const data = await getCollection({
      email: user?.email,
    });
    console.log(data.data.data);
    setAllCollection(data.data.data);
  };
  const createNewCollection = async (req, res) => {
    var temp = collectionName;
    temp = temp.trim();
    if (temp == undefined || temp == "") {
      alert("collection name is required");
      return;
    }
    const data = await createCollection({
      CollectionName: collectionName,
      email: user?.email,
    });
    showAllCollections();
    console.log(data);
    alert("collection created");
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
            <Form.Label></Form.Label>
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
