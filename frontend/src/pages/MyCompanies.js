import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { getProfileDetails, createProfile } from "../api/index.js";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SvgInline from "../utils/SvgInline.js";
import "../utils/svginline.css";
import "../scss/company.scss";
import { BsFillPlusCircleFill } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
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
          console.log("data", data);
          alert("successfully saved domain " + d);
          navigate("/editProfile", { state: { data: {domain:domain} } })
          console.log("domain", domain);
        } catch (err) {
          console.log(err);
          alert("Profile is not created");
        }
      }
    }
  };
  const next = () => {
    var check = 0;
    for (let i = 0; i < company?.length; i++) {
      if (company[i].domain === domain) {
        check = 1;
        document.getElementById("domainError").classList.remove("visually-hidden");
        break;
      }
    }
    if (check != 1) {
      var domainParts = domain.split(".");
      if (domainParts.length >= 2 && domainParts[1].length >= 1) {
        storeProfileValue();
        console.log("Invalid1");
      }
      else {
        console.log("Invalid2");
        document.getElementById("WrongdomainError").classList.remove("visually-hidden");
      }
      console.log("Invalid3");
    }
    // navigate("/editProfile")
  };
  const findSharedEmail = async (req, res) => {
    var shareddEmail = await getProfileDetails({});

    setAllData(shareddEmail.data.data);
    console.log("ans", shareddEmail.data.data);
  };
  const profileDetails = async (req, res) => {
    fresult = await getProfileDetails({ email: user.email });
    setCompany(fresult.data.data);

    // if (Array.isArray(fresult.data.data) && fresult.data.data.length) {
    // } else {
    //   navigate("/editProfile");
    // }
  };

  return (
    <div className="h-100">
      {loading ? (
        <ClipLoader />
      ) : (
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
                          {

                            Company.logo !== undefined && Company.logo !== "null"
                              ? <img src={Company.logo} alt="" />
                              : <img src="/assets/picture.svg" alt="" />

                          }
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
              {/* <Link to="/addBrand"> */}
              <Card className="h-100 item-company" onClick={handleShow}>
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
                    <Link to="/domainVerify" state={{ data: company }}>
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
                        // setDomain(extractDomain(e.target.value));
                        setDomain(e.target.value);
                        // checkDomain(e.target.value);
                      }}
                    // value={domain}
                    />
                    <br></br>
                    {/* {console.log("data: company",company)} */}

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
                 {console.log("consoleee",Company)}
                return (
                  <div
                    key={Company._id}
                    className="d-flex justify-content-center item"
                  >
                    {Company?.sharedEmail?.map((sharedEmail, index) => {
                      {console.log("console",index,sharedEmail)}
                      return (
                        <>

                          <div key={index}>
                            {sharedEmail == user.email ? (
                              <Link to={"/" + Company.domain}>
                                {showSharedCompanies
                                  ? ""
                                  : setShowSharedCompanies(true)}
                                <Card className="item-company">
                                  <div
                                    style={{ overflow: "auto" }}
                                    className="img_size"
                                  >
                                    {

                                      Company.logo !== undefined && Company.logo !== "null"
                                        ? <img src={Company.logo} alt="" />
                                        : <img src="/assets/picture.svg" alt="" />

                                    }
                                  </div>
                                  <Card.Body>
                                    <Card.Title
                                      style={{ textDecoration: "none" }}
                                      className="text-center"
                                    >
                                      {Company.name
                                        ? Company.name
                                        : Company.domain}
                                    </Card.Title>
                                    <Card.Text></Card.Text>
                                  </Card.Body>
                                </Card>
                              </Link>
                            ) : (
                              ""
                            )}
                          </div>

                        </>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

export default MyCompany;
