import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Container,
  Form,
  Navbar,
  Nav,
  Card,
  Button,
  Modal,
  ListGroup,
  Dropdown,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import ClipLoader from "react-spinners/ClipLoader";
import "../utils/SvgInLine.css";
import "../scss/brand.scss";
import { UserAuth } from "../context/AuthContext";
import CopyToClipboard from "../components/CopyToClipboard.js";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  getProfileDetails,
  sendSearchAPI,
  updateProfileFields,
  getCollection,
} from "../api/Index.js";
import saveAs from "file-saver";
import { BsFillPlusCircleFill, BsFillTrashFill } from "react-icons/bs";
import {
  MdArrowBackIos,
  MdVerified,
  MdShare,
  MdOutlineModeEdit,
  MdMoreVert,
  MdCode,
} from "react-icons/md";
import Addfile from "./Addfile.js";
import ModalComponent from "../components/ModalComponent.js";
import { SocialIcon } from 'react-social-icons';




function Not_found() {
  return <div className="not-found">Not found</div>;
}

function Brand() {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [aboutus, setAboutus] = useState();
  const [domain, setDomain] = useState();
  const [guidlines, setGuidlines] = useState();
  const [email, setEmail] = useState();
  const [sharedEmail, setSharedEmail] = useState([]);
  const { user } = UserAuth();
  const [links, setLinks] = React.useState([]);
  const [DomainPost, setDomainPost] = useState();
  const [verify, setVerify] = useState();
  const [allColor, setAllColor] = useState();
  const [fontLink, setFontLink] = useState([]);
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();
  const [showw, setShoww] = useState(false);
  const [isShared, setSharedCompany] = useState(false);
  const handleShoww = () => setShoww(true);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRepeatingEmail, setIsRepeatingEmail] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const [CopyValue, setCopyValue] = useState("Copy link");
  const [fullscreen, setFullscreen] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [collections, setcollections] = useState([]);
  const [addImageToCollection, setAddImageToCollection] = useState();
  const [addedCollection, setaddedcollection] = useState(false);
  const [variants, setvariants] = useState([]);
  const [indexToaddToFav, setIndexToaddToFav] = useState();
  const { key } = useLocation();
  const handleClosee = () => {
    setIsRepeatingEmail(false);
    setShoww(false);
  };
  const removeSharedEmail = (index) => {
    let temp = sharedEmail;
    temp.splice(index, 1);
    setSharedEmail([...temp]);
    updateLogo();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserEmail(false);
    setIsRepeatingEmail(false);
    var repeatOrNot = false;
    for (var i = 0; i < sharedEmail?.length; i++) {
      if (event.target.sharingEmail.value == (user?.email ?? email)) {
        setUserEmail(true);
      }
      if (event.target.sharingEmail.value == sharedEmail[i]) {
        repeatOrNot = true;
        setIsRepeatingEmail(true);
      }
    }
    if (event.target.sharingEmail.value && !repeatOrNot) {
      let temp = sharedEmail;
      let email = event.target.sharingEmail.value;
      if (email != user?.email) {
        temp.push(email);
      }
      setSharedEmail([...temp]);
      updateLogo();
    }
  };

  const DownloadToSvg = async (svg, fileName) => {
    saveAs(svg, fileName);
  };

  const title = useParams();
  const getbrandslogo = async (id) => {
      const data = await sendSearchAPI({ domain: id, active: 1 });
      setDomainPost(data?.data?.data);
      if (user) {
        const collection = await getCollection({
          email: user.email,
        });
        setcollections(collection);
        setvariants([]);
        var temp = [];
        for (var j = 0; j < data?.data?.data?.length; j++) {
          // var flag = true;
          const isFind = collection?.data?.data.find(col=>
            col.Logos.includes(
              data?.data?.data[j]?._id
            ))
          if(isFind )
          {
            temp.push("black");
          } else {
            temp.push("red");
          }
        }
        setvariants([...temp]);
        // console.log("hello ");
        setLoading(false);
      }
  };
  const getbrand = async () => {
    const fresult = await getProfileDetails({
      domain: title.title,
      searchfrom: true,
    });

    if (fresult?.data?.data?.length>0) {
      setCompany(fresult?.data?.data[0]);
      setId(fresult?.data?.data[0]._id);
      setName(fresult?.data?.data[0].name);
      setAboutus(fresult?.data?.data[0].aboutus);
      setLinks(fresult?.data?.data[0].links);
      setDomain(fresult?.data?.data[0].domain);
      setGuidlines(fresult?.data?.data[0].guidlines);
      setFontLink(fresult?.data?.data[0].fontLink);
      setAllColor(fresult?.data?.data[0].color);
      setEmail(fresult?.data?.data[0].email);
      setVerify(fresult?.data?.data[0].verify);
      setSharedEmail(fresult.data.data[0].sharedEmail);
      if(fresult?.data?.data[0].domain)
        getbrandslogo(fresult?.data?.data[0]._id);
      else
        setLoading(false);
    } else {
      setLoading(false);
    }
    isCompanyShared();
  };

  const isCompanyShared = async () => {
    for (var i = 0; i < sharedEmail?.length; i++) {
      if (user?.email === sharedEmail[i]) {
        setSharedCompany(true);
      }
    }
  };

  const updateLogo = async (logo_url) => {
    const data = {
      _id: id,
      name: name,
      aboutus: aboutus,
      logo: logo_url,
      links: links,
      domain: domain,
      guidlines: guidlines,
      sharedEmail: sharedEmail,
      color: allColor,
      email: email,
      verify: verify,
    };

    await updateProfileFields(data);
  };
  useEffect(() => {
    if(title.title)
      getbrand();
  },[title.title])
  useEffect(() => {
    return () => {
      const fontLINKs = document.getElementsByClassName("fontUrl");
      if (fontLINKs.length > 0) {
        for (var i = 0; i < fontLINKs.length; i++) {
          fontLINKs[i].remove();
        }   
}
    }
  }, [user, modalShow]);
function handleShow() {
  setFullscreen("md-down");
  setShow(true);
}
return (
  <>
    {loading ? (
      <div className="center-loader">
        <ClipLoader />
      </div>
    ) : (


        <div className="bg-light flex-fill">
          <Container>
            {domain ? (
              <div className="row mt-4">
                <Navbar>
                  <Container>
                    <Nav className="me-auto">
                      <Navbar.Brand className="me-auto">
                        <Button
                          variant="outline-dark"
                          onClick={() => {
                            if (key === "default") {
                              navigate("/");
                            } else {
                              navigate(-1);
                            }
                          }}
                        >
                          <MdArrowBackIos />
                        </Button>
                      </Navbar.Brand>
                    </Nav>

                    {user ? (
                      email === user.email || isShared == true ? (
                        <>
                          <Nav className="nav-action">
                            <Nav.Link
                              onClick={() => {
                                handleShoww();
                                setCopyValue("Copy link");
                              }}
                            >
                              <MdShare />
                            </Nav.Link>

                            <Nav.Link
                              as={Link}
                              to="/editprofile"
                              state={{ data: company }}
                            >
                              <MdOutlineModeEdit />
                            </Nav.Link>
                          </Nav>

                          <Modal show={showw} onHide={handleClosee}>
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Share {name ? name : domain}
                              </Modal.Title>
                            </Modal.Header>

                            <Form onSubmit={handleSubmit}>
                              <Modal.Body>
                                {userEmail ? (
                                  <Form.Label>
                                    You cant share your company with you
                                  </Form.Label>
                                ) : (
                                  ""
                                )}
                                <br></br>
                                {isRepeatingEmail ? (
                                  <Form.Label>
                                    Repetation value not allowed{" "}
                                  </Form.Label>
                                ) : (
                                  ""
                                )}
                                {isRepeatingEmail ? <br></br> : ""}
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                  type="email"
                                  id="addEmail"
                                  name="sharingEmail"
                                  placeholder="Enter email"
                                  autoFocus
                                />

                                <ListGroup variant="flush">
                                  {sharedEmail.map((email, index) => {
                                    return (
                                      <div key={index}>
                                        {email?.length > 4 && (

                                          <h5>
                                            {email}
                                            <Button
                                              onClick={() => {
                                                removeSharedEmail(index);
                                              }}
                                            >
                                              <BsFillTrashFill />
                                            </Button>
                                          </h5>
                                        )}

                                      </div>
                                    );
                                  })}
                                </ListGroup>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="outline-dark"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      window.location.href
                                    );
                                    setCopyValue("copied!!");
                                  }}
                                >
                                  {CopyValue}
                                </Button>
                                <Button
                                  variant="secondary"
                                  onClick={handleClosee}
                                >
                                  Close
                                </Button>
                                <Button type="submit" variant="primary">
                                  Share
                                </Button>
                              </Modal.Footer>
                            </Form>
                          </Modal>
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    {user && (
                      <Nav className="nav-action">
                        <Nav.Link
                          onClick={() => {
                            navigate("json");

                          }}
                        >
                          <MdCode />
                        </Nav.Link>
                      </Nav>
                    )}

                  </Container>
                </Navbar>

                <div className="col-lg-12 col-md-12">                  
                  <div className="row">
                      <div className="col-lg-7 col-md-6 col-sm-12">
                        <div className="">
                          <div>{name ? <h1>{name}</h1> : ""}</div>
                          <div                          
                            id="aboutus"
                            dangerouslySetInnerHTML={{ __html: aboutus }}
                          ></div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 col-sm-12">
                        <div className="align-items-center d-flex mt-3 mb-3">
                          <a
                            href={"https://" + domain}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="b-domain me-2"
                          >
                            {domain}
                          </a>
                          {user ? (
                            email === user.email ? (
                              verify === "true" ? (
                                <MdVerified />
                              ) : (
                                <>
                                  (Not verified)
                                  <div className="flex-fill"></div>
                                  <Link
                                    to="/domainverify"
                                    className="text-sm"
                                    state={{ data: company }}
                                  >
                                    How to verify domain?
                                  </Link>
                                </>
                              )
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="d-flex">
                          {links?.map((link) => {
                            return (
                              <div key={link} className="social-icons">
                                <SocialIcon className="icon" url={link} target="_blank" style={{ height: 32, width: 32 }} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                  </div>

                  <div className="mt-5">
                    {DomainPost?.length > 0 ? <h5>Logos</h5> : ""}
                    <div className="grid">
                      {DomainPost?.map((brand, index) => {
                        return (
                          <div key={brand._id} className="item">
                            <Card className="box-shadow">
                              <Link to={"/stuff/" + brand._id}>
                                <div
                                  style={{ overflow: "auto" }}
                                  className="img_size pattern-square"
                                >
                                  {brand.url !== undefined &&
                                    brand.url !== "null" ? (

                                    <img src={brand.url} alt="" />
                                  ) : (
                                    <img src="/assets/picture.svg" alt="" />
                                  )}
                                </div>
                              </Link>
                              <Card.Body className="d-flex">
                                <Card.Title style={{ textDecoration: "none" }}>

                                  {brand.title}
                                </Card.Title>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  className="me-1"
                                  onClick={() => {
                                    navigate("/stuff/" + brand._id);
                                  }}
                                >
                                  PNG
                                </Button>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  className="me-1"
                                  onClick={() => {
                                    DownloadToSvg(brand.url, brand.title);

                                  }}
                                >
                                  SVG
                                </Button>

                                <Dropdown>
                                  <Dropdown.Toggle
                                    variant="light"
                                    id="dropdown-basic"
                                    size="sm"
                                  >

                                    <MdMoreVert />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      onClick={() => {
                                        setModalShow(true);
                                        setAddImageToCollection(brand._id);
                                        setIndexToaddToFav(index);

                                      }}
                                    >

                                      <BookmarkIcon
                                        style={{ color: variants[index] }}
                                      />
                                      Save to collection
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </Card.Body>
                            </Card>
                          </div>
                        );
                      })}

                      {user ? (
                        email === user.email || isShared == true ? (
                          // <Link to="/addfile" className="add-new" state={{ domain: domain }}>
                          <div className="add-new">
                            <Card className="item border-0 box-shadow" onClick={() => handleShow()}>
                              {/* <Card className="h-100 item-company"> */}
                              <Card.Body className="add-icon align-items-center d-flex justify-content-center">
                                <Card.Title className="text-center">
                                  <BsFillPlusCircleFill
                                    style={{ fontSize: 40 }}
                                  />
                                </Card.Title>
                                <Card.Text></Card.Text>
                              </Card.Body>
                              <Card.Body>
                                <Card.Title>Add New</Card.Title>
                              </Card.Body>
                            </Card>
                          </div>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    {allColor[0]?.colorValue &&
                      allColor[0]?.colorValue != "" ? (

                      <h5>Colors</h5>
                    ) : (
                      ""
                    )}
                    {allColor != "" ? (
                      <div className="d-flex colors-wrp">
                        {allColor?.map((color, index) => {
                          return (
                            <div className="color-item box-shadow" key={index}>
                              {color.colorValue != "" ? (
                                <div>
                                  <div
                                    id="background"
                                    style={{
                                      width: 150,
                                      height: 150,
                                      backgroundColor: color.colorValue,
                                    }}
                                  ></div>

                                  <div className="color-footer" id="inputText">
                                    <div>{color.colorName}</div>
                                    <div className="d-flex justify-content-between">
                                      {color.colorValue}
                                      <CopyToClipboard
                                        color={color.colorValue}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div>
                    <div className="d-flex"></div>
                  </div>

                  <div className="mt-5">
                    {fontLink != "" && <h5>Fonts</h5>}

                    <div className="d-flex">
                      {fontLink?.map((link, index) => {
                        return (
                          <div key={index} style={{ fontFamily: link, fontSize: '24px' }} className="card p-2 m-1">
                            <Helmet>
                              <link
                                className="fontUrl"
                                rel="stylesheet"
                                href={`https://fonts.googleapis.com/css2?family=${link}`}
                              />
                            </Helmet>
                            {link}

                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5">
                    {guidlines?.length > 12 ? <h5>Guidelines</h5> : ""}
                    <div dangerouslySetInnerHTML={{ __html: guidlines }}></div>
                  </div>
                </div>
                <Modal
                  show={show}
                  fullscreen={fullscreen}
                  onHide={() => setShow(false)}
                >
                  <Modal.Header closeButton>
                    Add logo to <strong className="ms-2">{domain}</strong>
                  </Modal.Header>
                  <Modal.Body>
                    <Addfile domain={domain} />
                  </Modal.Body>
                </Modal>
              </div>
            ) : (
              <Not_found />
            )}
            {modalShow && (
              <ModalComponent
                setvariants={setvariants}
                variants={variants}
                setaddedcollection={setaddedcollection}
                index={indexToaddToFav}
                value={addedCollection}
                id={addImageToCollection}
                allcollection={collections}
                setcollections={setcollections}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            )}

          </Container>
        </div>
      )}
    </>
  );
}

export default Brand;
