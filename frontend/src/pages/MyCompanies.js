import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { getProfileDetails, createProfile } from "../api/Index.js";
import { Container, Row, Col, Form, Card, CardGroup } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SvgInline from "../utils/SvgInLine.js";
import "../utils/SvgInLine.css";
import "../scss/company.scss";
import { BsFillPlusCircleFill } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CompanyCard from "../components/CompanyCard.js"

function MyCompany() {
  const [company, setCompany] = useState();
  const [allData, setAllData] = useState();
  const [domain, setDomain] = useState();
  const [showSharedCompanies, setShowSharedCompanies] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

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
  function extractDomain(url) {
    var domainName;
    if (url.indexOf("://") > -1) {
      domainName = url.split("/")[2];
    } else {
      domainName = url.split("/")[0];
    }
    //find & remove www
    if (domainName.indexOf("www.") > -1) {
      domainName = domainName.split("www.")[1];
    }
    domainName = domainName.split(":")[0];
    domainName = domainName.split("?")[0];
    return domainName;
  }

  const storeProfileValue = async (req, res) => {
    if (user) {
      if (user?.email) {
        try {
          const d = extractDomain(domain);
          setDomain(d);
          const data = await createProfile({
            domain: d,
            email: user?.email,
          });

          alert("successfully saved domain " + d);

          navigate("/editprofile", { state: { data: data.data.data }})

        } catch (err) {
          // console.log(err);
          alert("Profile is not created");
        }
      }
    }
  };
  const next = () => {
    var check = 0;
    for (let i = 0; i < allData?.length; i++) {

      if (allData[i].domain === domain) {
        check = 1;
        document.getElementById("domainError").classList.remove("visually-hidden");
        break;
      }
    }
    if (check != 1) {
      var domainParts = domain.split(".");
      if (domainParts.length >= 2 && domainParts[1].length >= 1) {
        storeProfileValue();

      }
      else {

        document.getElementById("WrongdomainError").classList.remove("visually-hidden");
      }

    }
  };
  const findSharedEmail = async (req, res) => {
    var shareddEmail = await getProfileDetails({});

    setAllData(shareddEmail.data.data);

  };
  const profileDetails = async (req, res) => {
    fresult = await getProfileDetails({ email: user.email });
    setCompany(fresult.data.data);

  };

  return (
    <>
      {loading ? (
        <div className="center-loader"><ClipLoader /></div>
      ) : (
        <div>
          <Container>
            <div className="grid">
              {company?.map((Company) => {
                return (
                  <CompanyCard props={Company}/>
                );
              })}
              {/* <Link to="/editprofile" className="add-new"> */}
              {/* <Link to="/addBrand"> */}
              <Card className="h-100 item-company add-new" onClick={handleShow}>
                <Card.Body className="add-icon align-items-center d-flex justify-content-center">
                  <Card.Title className="text-center">
                    <BsFillPlusCircleFill style={{ fontSize: 40 }} />
                  </Card.Title>
                </Card.Body>
                <Card.Body>
                  <Card.Title className="text-center">Add New Brand</Card.Title>
                </Card.Body>
                
              </Card>
              {/* </Link> */}


              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Your Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="visually-hidden" id="domainError">
                    This company is already created{" "}
                    <Link to="/domainverify" state={{ data: company }}>
                      Clam your brand
                    </Link>
                  </div>
                  <div className="visually-hidden" id="WrongdomainError">
                    Please Enter Correct Domain{" "}
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Domain * <small>(example.com)</small>
                    </Form.Label>
                    <Form.Control
                      type="domain"
                      placeholder="Enter domain name"
                      list="doaminBrowsers"
                      autoComplete="off"
                      name="myBrowser"
                      id="domain"
                      onChange={(e) => {

                        setDomain(e.target.value);

                      }}

                    />
                    <br></br>


                    <Button variant="primary" onClick={() => next()}>Next</Button>
                  </Form.Group>
                </Modal.Body>
              </Modal>


            </div>
          </Container>

          <br></br>
          <Container>
            <div className="separator center my-5">
              <span className="sep-txt">Shared Companies</span>
              {showSharedCompanies ? "" : "No shared Companies with you"}
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
                             <CompanyCard props={Company}/>
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
      )}
    </>
  );
}

export default MyCompany;
