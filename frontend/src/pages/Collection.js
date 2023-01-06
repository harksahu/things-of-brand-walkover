import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getCollection, updateCollection,getCollectionDetailsInJson } from "../api/Index";
import { Container, Card, Nav, Navbar, Modal } from "react-bootstrap";
import { MdArrowBackIos, MdCode } from "react-icons/md";
import Button from "react-bootstrap/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import DeleteComponent from "../components/DeleteComponent";
import JsonModel from "../components/JsonModel.js"

const Collection = () => {
  const [loading, setLoading] = useState(true);
  const [allLogos, setallLogos] = useState([]);
  const [logoId, setLogoId] = useState([]);
  const [collectionId, setCollectionId] = useState("");
  const [CollectionName, setCollectionName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [IndexIdToDelete, setIndexIdToDelete] = useState({
    index: -1,
    id: ""
  });
  const [CompanyData, setCompanyData] = useState();
  const [showJson, setShowJson] = useState(false);

  const handleCloseJson = () => setShowJson(false);
  const handleShowJson = () => setShowJson(true);
  const { user } = UserAuth();
  const navigate = useNavigate();
  const { key } = useLocation();

  const id = useParams();

  const getAllLogosFromCollection = async () => {
    var data = await getCollection({
      _id: id.id,
      email: user?.email,
    });
    setLogoId(data?.data?.data[0]?.Logos)
    setallLogos(data?.data?.data[0]?.logo);
    setLoading(false);
    setCollectionId(data?.data?.data[0]?._id);
    setCollectionName(data?.data?.data[0]?.CollectionName)
  };



  const GetCollectionDetail = async () => {
    const data = await getCollectionDetailsInJson({ id: id.id })
    setCompanyData(data?.data?.data[0])
    handleShowJson()
  }


  const deleteLogo = async (logoIdd, _id) => {
    const index = logoId.indexOf(logoIdd);
    if (index > -1) {
      logoId.splice(index, 1);
    }
    setLogoId(logoIdd);
    await updateCollection({
      _id: _id,
      Logos: logoId
    })
    getAllLogosFromCollection();

  }

  useEffect(() => {
    if (user?.email && id)
      getAllLogosFromCollection();
  }, [user]);
  return (
    <div className="py-4 bg-light flex-fill">
      {loading ? <div className="center-loader">
        <ClipLoader />
      </div> :

        <Container>
          <DeleteComponent
            show={modalShow}
            msg={"Delete"}
            setmodalshow={setModalShow}
            onSubmit={() => deleteLogo(IndexIdToDelete?.index, IndexIdToDelete?.id)}
          />
          <div className="row">
            <Navbar>
              <Nav className="me-auto">
                <Navbar.Brand className="me-auto">
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      if (key === "default") {
                        navigate('/');
                      } else {
                        navigate(-1);
                      }
                    }}
                  >
                    <MdArrowBackIos />
                  </Button>
                </Navbar.Brand>
                <Navbar.Text>
                  {CollectionName}
                </Navbar.Text>
              </Nav>
              {
                user && (<Nav className="nav-action">
                  <Nav.Link
                    onClick={() => {
                      GetCollectionDetail()
                    }}
                  >
                    <MdCode />
                  </Nav.Link>
                </Nav>
                )
              }
            </Navbar>
          </div>

          <div className="d-flex item " style={{ flexWrap: "wrap" }}>
            {allLogos?.length
              ? allLogos?.map((collection, index) => {
                return (
                  <div key={index}>

                    <div className="m-4" style={{ width: "10rem" }} >
                      <Card
                        className="item-company">
                        <Link to={"/stuff/" + collection?.logo_id}>
                          <div
                            // style={{ overflow: "auto" }}
                            className="img_size  pattern-square"
                          >
                            {collection?.url !== undefined &&
                              collection?.url !== "null" ? (
                              <img style={{ height: "8rem", width: "6rem" }}
                                src={collection?.url} alt="" />
                            ) : (
                              <img style={{ height: "8em", width: "6rem" }}
                                src="/assets/picture.svg" alt="" />
                            )}
                          </div>
                        </Link>
                        <Card.Body style={{}}>
                          <Card.Title
                            style={{ width: "auto", display: "flex", fontSize: "0.8rem", textDecoration: "none", justifyContent: "center", textalign: "center", alignItems: "center" }}
                            className="text-center"
                          >
                            <p style={{
                              textOverflow: "ellipsis",
                              margin: "0px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }} >
                              {collection.name}
                            </p>
                            <DeleteIcon onClick={() => {
                              //  deleteLogo(logoId[index], collectionId)
                              setIndexIdToDelete({
                                index: logoId[index],
                                id: collectionId
                              })
                              setModalShow(true);
                            }} />

                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                );
              })
              : <div  ><h4>Please add logos to collection</h4></div>}
          </div>

          <Modal fullscreen={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered show={showJson} onHide={handleCloseJson}>
            <Modal.Header closeButton>
              <Modal.Title>{id?.id} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <JsonModel data={CompanyData} id={id?.id} show={"Collection"}


              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseJson}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>}
    </div >
  );
};

export default Collection;
