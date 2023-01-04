import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Modal from "react-bootstrap/Modal";
import { Container, Form, Card, Dropdown } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "../scss/collection.scss";
import "../utils/SvgInLine.css";
import {
  createCollection,
  getCollection,
  deleteCollections
} from "../api/Index.js";
import { MdMoreVert } from "react-icons/md"
import { Link } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import AlertComponent from "../components/AlertComponent";
import DeleteComponent from "../components/DeleteComponent";
import ClipLoader from "react-spinners/ClipLoader";
import Col from 'react-bootstrap/Col';
const MyCollection = () => {
  const [allCollection, setAllCollection] = useState([]);
  const [show, setShow] = useState(false);
  const [collectionName, setCollectionName] = useState();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [collectionToDelete, setcollectiontodelete] = useState(false);

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
    setLoading(false);
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
      setMessage("Collection deleted successfully !");
      setShowAlert(true)
      // <Alert>Hello</Alert>
    }
  };
  const createNewCollection = async (event) => {
    event.preventDefault();
    var temp = collectionName;
    temp = temp?.trim();
    if (temp == undefined || temp == "") {
      setShow(false);
      setMessage("Collection name is required *");
      setShowAlert(true)
      return;
    }
    await createCollection({
      CollectionName: collectionName,
      email: user?.email,
    });
    showAllCollections();
    setMessage("Collection created successfully !");
    setShowAlert(true)
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
    <div className="py-4 bg-light flex-fill">
      {loading ? <div className="center-loader">
        <ClipLoader />
      </div> :
        <Container>
          <DeleteComponent
                          show={modalShow}
                          setmodalshow={ setModalShow}
                          setcollectiontodelete={setcollectiontodelete}
                          onSubmit ={()=>deleteCollection(collectionToDelete)}
                           />
          <Col md={6} className="mb-2">

      </Col>
          <AlertComponent message={message} showAlert={showAlert} setShowAlert={setShowAlert} />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={createNewCollection}>
                <InputComponent
                  value={collectionName}
                  setValue={setCollectionName}
                  label={"Collection name"}
                  placeholderr={"Enter collection name"}
                  autoFocus={true}
                />
                <Button type="submit " variant="primary">
                  Add
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          <div className="grid-small">
            {allCollection &&
              allCollection.map((collection) => {
                return (
                  <div key={collection._id} className="d-flex box-shadow coll-item">
                    <Link to={"/collection/" + collection._id} className="align-items-center d-flex flex-fill p-3">
                        <Card.Title className="bold flex-fill">{collection?.CollectionName} </Card.Title>
                        <div className="d-flex coll-preview align-items-center">
                          {collection?.logo &&
                            collection?.logo?.map((logo, index) => {
                              return (
                                index < 5 && (
                                  <div className="cpi" key={index}>
                                    <img src={logo?.url} key={index} width="24px" height="24px" style={{ marginRight: "5px" }} />
                                  </div>
                                )
                              )
                            })
                          }
                          <div className="count">
                          {
                            collection?.logo?.length > 5 && ("+" + (collection?.logo?.length - 5))
                          }
                          </div>
                        </div>
                    </Link>

                    <Dropdown className="p-3 d-flex align-items-center">
                      <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm">
                        <MdMoreVert />
                      </Dropdown.Toggle>
                  
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                          setModalShow(true);
                          setcollectiontodelete(collection)
                        }}>
                          <DeleteIcon />
                          Delete Collection
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                );
              })}
            <Card onClick={handleShow} className="d-flex box-shadow coll-item add-collection border-0">
              <Card.Body className="add-icon d-flex align-items-center">
                <Card.Title className="mb-0 flex-fill">Add New Collection</Card.Title>
                <BsFillPlusCircleFill style={{ fontSize: 32 }} />
              </Card.Body>
            </Card>
          </div>
        </Container>}
    </div >
  );
};

export default MyCollection;
