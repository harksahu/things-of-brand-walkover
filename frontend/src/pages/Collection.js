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
                  <Navbar.Text className="ms-2">
                    {CollectionName}
                  </Navbar.Text>
                </Navbar.Brand>
              </Nav>
              {
                user && (<Nav className="nav-action">
                  <Button
                    variant="btn"
                    onClick={() => {
                      GetCollectionDetail()
                    }}
                  >
                    <MdCode /> Code
                  </Button>
                </Nav>
                )
              }
            </Navbar>

          <div className="d-flex item grid collection" style={{ flexWrap: "wrap" }}>
            {allLogos?.length
              ? allLogos?.map((collection, index) => {
                return (
                  <Card
                    key={index}
                    className="item-company">
                    <Link to={"/stuff/" + collection?.logo_id}>
                      <div
                        // style={{ overflow: "auto" }}
                        className="img-size  pattern-square"
                      >
                        {collection?.url !== undefined &&
                          collection?.url !== "null" ? (
                          <img src={collection?.url} alt="" />
                        ) : (
                          <img src="/assets/picture.svg" alt="" />
                        )}
                      </div>
                    </Link>
                    <Card.Body>
                      <Card.Title>
                        <label className="ellipsis">
                          {collection.name}
                        </label>
                        <button type="button" className="btn-icon icon-sm"
                          onClick={() => {                          
                            setIndexIdToDelete({
                              index: logoId[index],
                              id: collectionId
                            })
                            setModalShow(true);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                );
              })
              : <div  ><h4>Please add logos to collection</h4></div>}
          </div>

          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            size="xl"
            centered show={showJson} onHide={handleCloseJson}>
            <Modal.Header closeButton>
              <Modal.Title>{CollectionName} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                A <strong>GET</strong> request to fetch the collection <strong>{CollectionName}</strong>.
              </div>
              <JsonModel data={CompanyData} id={id?.id} show={"Collection"}/>
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
