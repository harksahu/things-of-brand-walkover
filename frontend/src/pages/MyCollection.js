import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Modal from "react-bootstrap/Modal";
import { Container, Form, Card, Dropdown } from "react-bootstrap";
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
import { MdMoreVert } from "react-icons/md"
import { Link } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import AlertComponent from "../components/AlertComponent";
import ClipLoader from "react-spinners/ClipLoader";
const MyCollection = () => {
  const [allCollection, setAllCollection] = useState([]);
  const [show, setShow] = useState(false);
  const [collectionName, setCollectionName] = useState();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);


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
    <div>
      {loading ? <div className="center-loader">
        <ClipLoader />
      </div> :
        <Container>
          <AlertComponent message={message} showAlert={showAlert} setShowAlert={setShowAlert} />
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
          <div className="grid-small ">
            {allCollection &&
              allCollection.map((collection) => {
                return (
                  <div key={collection._id}>
                    <div>
                      {/* className="d-flex justify-content-center item " */}
                      {/* <Card className="item-company">
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
                            style={{ textDecoration: "none" }}
                            className="text-center"
                          >
                            {collection.CollectionName}<DeleteIcon
                              onClick={() => {
                                deleteCollection(collection);
                              }}
                            />

                          </Card.Title>

                        </Card.Body>
                      </Card> */}
                      <Card className="p-3">
                        <Card.Body style={{display:"grid",gridTemplateColumns:"95% 5%" }}>
                          <Link to={"/collection/" + collection._id} style={{textDecoration: "none" ,color:"black"}}>
                          <div className="d-flex justify-content-between">
                            <Card.Title className="bold">{collection?.CollectionName} </Card.Title>
                            <div className="d-flex">
                            {collection?.logo &&
                              collection?.logo?.map((logo, index) => {
                                return (
                                  index < 5 && (
                                    <img src={logo?.url} key={index} width="30px" />

                                  )
                                )
                              })
                            }
                            {
                              collection?.logo?.lenght ?((collection?.logo?.length - 5+"+")):""
                            }
                            </div>
                          </div>
                          </Link>

                          <Dropdown>
                              <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm">
                                <MdMoreVert />
                              </Dropdown.Toggle>


                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {
                                  deleteCollection(collection);
                                }}>
                                  <DeleteIcon />
                                  Delete Collection
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                );
              })}
            <Card className="text-center" style={{
              color: "#999",
              textDecoration: "none"
            }} onClick={handleShow}>
              <Card.Body className="add-icon ">
                <Card.Title>Add New Collection</Card.Title>
                <BsFillPlusCircleFill style={{ fontSize: 40 }} />
              </Card.Body>
            </Card>
          </div>
        </Container>}
    </div >
  );
};

export default MyCollection;
