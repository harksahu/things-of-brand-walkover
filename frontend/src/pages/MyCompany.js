import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { getProfileDetails } from "../api/index.js";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SvgInline from "../utils/SvgInline.js";
import "../utils/svginline.css";
import "../scss/company.scss";
import { BsFillPlusCircleFill } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
function MyCompany() {
  const [company, setCompany] = useState();
  const [allData, setAllData] = useState();
  const [showSharedCompanies, setShowSharedCompanies] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading,setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setLoading(true);

    if (user) {
      if (user?.email) {
        profileDetails();
        setLoading(false);
      }
    }
    findSharedEmail();
  }, [user]);
  let fresult;

  const findSharedEmail = async (req, res) => {
    var shareddEmail = await getProfileDetails({});

    setAllData(shareddEmail.data.data);
  };
  const profileDetails = async (req, res) => {
    fresult = await getProfileDetails({ email: user.email });
    setCompany(fresult.data.data);

    if (Array.isArray(fresult.data.data) && fresult.data.data.length) {
    } else {
      navigate("/profile");
    }
  };

  return (
    

    <div className="h-100">
      {loading?
      <ClipLoader/>:
        <div>
      <Container>
        <div className="grid">
          {company?.map((Company) => {
            return (
              <div
                key={Company._id}
                className="d-flex justify-content-center item"
              >
                {/* <Link to={"/profile" }state={{ data: Company }}> */}
                <Link to={"/" + Company.domain}>
                  <Card className="item-company">
                    <div style={{ overflow: "auto" }} className="img_size">
                      <SvgInline name={Company.name} url={Company.logo} />
                    </div>
                    <Card.Body>
                      <Card.Title
                        style={{ textDecoration: "none" }}
                        className="text-center"
                      >
                        {Company.name ? Company.name : Company.domain}
                      </Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            );
          })}
          {/* <Link to="/editProfile" className="add-new"> */}
            <Card className="h-100 item-company">
              <Card.Body className="add-icon align-items-center d-flex justify-content-center">
                <Card.Title className="text-center">
                  <BsFillPlusCircleFill style={{ fontSize: 40 }} onClick={handleShow}/>
                </Card.Title>                
              </Card.Body>
              <Card.Body>
               {/* <Button variant="primary" onClick={handleShow}>
                  Add New Brand
               </Button> */}
               <Card.Title className="text-center">Add New Brand</Card.Title>
              </Card.Body>              
            </Card>
            {/* <Button variant="primary" onClick={handleShow}>
       Add New Brand
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
          {/* </Link> */}
        </div>
      </Container>

      <br></br>
      <Container>
        <div className="separator center my-5">
          <span className="sep-txt">Shared Companies</span>
          {showSharedCompanies?"":"No shared Companies with you"}
        </div>
        <div className="grid">
          {allData?.map((Company) => {
            return (
              <div
                key={Company._id}
                className="d-flex justify-content-center item"
              >
                {Company?.sharedEmail?.map((sharedEmail, index) => {
                  return (
                    <div key={index}>
                      {sharedEmail == user.email ? (
                        <Link to={"/" + Company.domain}>
                          {showSharedCompanies?"":setShowSharedCompanies(true)}
                          <Card className="item-company">
                            <div
                              style={{ overflow: "auto" }}
                              className="img_size"
                            >
                              <SvgInline
                                name={Company.name}
                                url={Company.logo}
                              />
                            </div>
                            <Card.Body>
                              <Card.Title
                                style={{ textDecoration: "none" }}
                                className="text-center"
                              >
                                {Company.name ? Company.name : Company.domain}
                              </Card.Title>
                              <Card.Text></Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Container>

      </div>
} 

    </div>
  );
}

export default MyCompany;