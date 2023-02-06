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
  getProfileDetailsInJson,
  sendMail,
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
  MdOutlineFileDownload,
} from "react-icons/md";
import Addfile from "./Addfile.js";
import ModalComponent from "../components/ModalComponent.js";
import { SocialIcon } from "react-social-icons";
import JsonModel from "../components/JsonModel.js";

function Not_found() {
  return <div className="not-found">Not found</div>;
}

function Company() {
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
  const [CompanyData, setCompanyData] = useState();
  const [showJson, setShowJson] = useState(false);
  const [defaultLogo, setDefaultLogo] = useState(false);
  const [ImgSections, setImgSections] = useState([]);
  const [TextSections, setTextSections] = useState([]);
  const handleCloseJson = () => setShowJson(false);
  const handleShowJson = () => setShowJson(true);
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
  const handleSubmit = async (event) => {
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

    const data = await sendMail({
      email: event.target.sharingEmail.value,
      name: user?.displayName,
      companyName: name,
    });
  };

  const GetCompanyDetail = async () => {
    const data = await getProfileDetailsInJson({ domain: title.title });
    setCompanyData(data?.data?.data[0]);
    handleShowJson();
  };

  const DownloadToSvg = async (svg, fileName) => {
    saveAs(svg, fileName);
  };

  const title = useParams();

  const getCollectionData = async () => {
    const collection = await getCollection({
      email: user.email,
    });
    setcollections(collection);
    setvariants([]);
    var temp = [];
    for (var j = 0; j < DomainPost?.length; j++) {
      // var flag = true;
      const isFind = collection?.data?.data.find((col) =>
        col.Logos.includes(DomainPost[j]?._id)
      );
      if (isFind) {
        temp.push("black");
      } else {
        temp.push("red");
      }
    }
    setvariants([...temp]);

    setLoading(false);
  };

  const getbrandslogo = async (id) => {
    const data = await sendSearchAPI({ domain: id, active: 1 });
    setDomainPost(data?.data?.data);
    setLoading(false);
  };
  const getbrand = async () => {
    const fresult = await getProfileDetails({
      domain: title.title,
      searchfrom: true,
    });

    if (fresult?.data?.data?.length > 0) {
      setDefaultLogo(fresult?.data?.data[0].logo || false);
      setCompany(fresult?.data?.data[0]);
      setId(fresult?.data?.data[0]._id);
      setName(fresult?.data?.data[0]?.name);
      setAboutus(fresult?.data?.data[0].aboutus);
      setLinks(fresult?.data?.data[0].links);
      setDomain(fresult?.data?.data[0].domain);
      setGuidlines(fresult?.data?.data[0].guidlines);
      setFontLink(fresult?.data?.data[0].fontLink);
      setAllColor(fresult?.data?.data[0].color);
      setEmail(fresult?.data?.data[0].email);
      setVerify(fresult?.data?.data[0].verify);
      setSharedEmail(fresult.data.data[0].sharedEmail);
      setTextSections(fresult?.data?.data[0]?.TextSections);
      setImgSections(fresult?.data?.data[0]?.ImageSections);
      if (fresult?.data?.data[0].domain)
        getbrandslogo(fresult?.data?.data[0]._id);
      else setLoading(false);
    } else {
      setLoading(false);
    }
    isCompanyShared(
      fresult?.data?.data[0]?.email,
      fresult.data.data[0]?.sharedEmail
    );
  };

  const isCompanyShared = async (myEmail, Shared) => {
    if (user?.email === myEmail) {
      setSharedCompany(true);
    } else {
      for (var i = 0; i < Shared?.length; i++) {
        if (user?.email === Shared[i]) {
          setSharedCompany(true);
        }
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
    if (title.title) getbrand();
  }, [title.title]);
  useEffect(() => {
    if (user?.email) {
      getCollectionData();
      isCompanyShared(email, sharedEmail);
    }
  }, [user]);
  useEffect(() => {
    if (domain && show === false) getbrandslogo(id);
  }, [show]);

  useEffect(() => {
    return () => {
      const fontLINKs = document.getElementsByClassName("fontUrl");
      if (fontLINKs.length > 0) {
        for (var i = 0; i < fontLINKs.length; i++) {
          fontLINKs[i].remove();
        }
      }
    };
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
                    <div className="d-flex">
                      {defaultLogo && (
                        <div>
                          <div className="cpi">
                            <img
                              src={defaultLogo}
                              width="35px"
                              height="56px"
                              style={{ marginRight: "5px" }}
                            />
                          </div>
                        </div>
                      )}
                      <div>
                        {" "}
                        <h1>{name}</h1>
                      </div>
                    </div>

                    <Nav className="nav-action">
                      {isShared && (
                        <>
                          <Button
                            className="me-2"
                            as={Link}
                            variant="btn"
                            to="/editprofile"
                            state={{ data: company }}
                          >
                            <MdOutlineModeEdit /> Edit
                          </Button>

                          <Button
                            className="me-2"
                            variant="btn"
                            onClick={() => {
                              handleShoww();
                              setCopyValue("Copy link");
                            }}
                          >
                            <MdShare /> Share
                          </Button>
                        </>
                      )}

                      {user && (
                        <Button
                          variant="btn"
                          onClick={() => {
                            GetCompanyDetail();
                          }}
                        >
                          <MdCode /> Code
                        </Button>
                      )}
                    </Nav>

                    {isShared && (
                      <Modal show={showw} onHide={handleClosee}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            Share {name ? name : domain}
                          </Modal.Title>
                        </Modal.Header>

                        <Form onSubmit={handleSubmit}>
                          <Modal.Body>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              type="email"
                              id="addEmail"
                              name="sharingEmail"
                              placeholder="Enter email"
                              autoFocus
                            />
                            {userEmail && (
                              <Form.Label className="text-danger small ps-2">
                                Already shared with this email.
                              </Form.Label>
                            )}
                            {isRepeatingEmail && (
                              <Form.Label className="text-danger small ps-2">
                                Already shared with this email.
                              </Form.Label>
                            )}

                            <ListGroup variant="flush">
                              {sharedEmail.map((email, index) => {
                                return (
                                  <ListGroup.Item
                                    key={index}
                                    className="d-flex align-items-center"
                                  >
                                    {email?.length > 4 && (
                                      <>
                                        <span className="me-auto">{email}</span>
                                        <button
                                          className="btn-sm btn"
                                          onClick={() => {
                                            removeSharedEmail(index);
                                          }}
                                        >
                                          <BsFillTrashFill />
                                        </button>
                                      </>
                                    )}
                                  </ListGroup.Item>
                                );
                              })}
                            </ListGroup>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="outline-dark"
                              className="me-auto"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  window.location.href
                                );
                                setCopyValue("copied!!");
                              }}
                            >
                              {CopyValue}
                            </Button>
                            <Button variant="secondary" onClick={handleClosee}>
                              Close
                            </Button>
                            <Button type="submit" variant="primary">
                              Share
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal>
                    )}
                  </Container>
                </Navbar>

                <div className="col-lg-12 col-md-12">
                  <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-12">
                      <div className="">
                        <div
                          id="aboutus"
                          dangerouslySetInnerHTML={{ __html: aboutus }}
                        ></div>
                      </div>
                      <div className="align-items-center d-flex mt-3 mb-3">
                        <a
                          href={"https://" + domain}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="b-domain me-2"
                        >
                          {domain}
                        </a>
                        {user &&
                          (email === user.email ? (
                            verify === "true" ? (
                              <MdVerified />
                            ) : (
                              <>
                                (<span className="me-2">Not verified!</span>
                                <Link
                                  to="/domainverify"
                                  className="text-sm how-to"
                                  state={{ data: company }}
                                >
                                  How to verify?
                                </Link>
                                )
                              </>
                            )
                          ) : (
                            <>
                              (<span className="me-2">Not verified!</span>
                              <Link
                                to="/domainverify"
                                className="text-sm how-to"
                                state={{ data: company }}
                              >
                                How to verify?
                              </Link>
                              )
                            </>
                          ))}
                      </div>
                      <div>
                        {links?.map((link) => {
                          return (
                            <div key={link} className="social-icons p-2 d-flex">
                              <SocialIcon
                                className="icon"
                                url={link}
                                target="_blank"
                                style={{ height: 32, width: 32 }}
                              />
                              <Card>
                                <a href={link} rel="noreferrer" target="_blank">
                                  {link}{" "}
                                </a>
                              </Card>
                              <CopyToClipboard color={link} />
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
                              <Link
                                className="h-100"
                                to={"/stuff/" + brand._id}
                              >
                                <div className="img-size pattern-square h-100">
                                  {brand.url !== undefined &&
                                  brand.url !== "null" ? (
                                    <img src={brand.url} alt="" />
                                  ) : (
                                    <img src="/assets/picture.svg" alt="" />
                                  )}
                                </div>
                              </Link>
                              <div className="item-footer d-flex">
                                <div className="flex-fill">{brand.title}</div>
                                <Dropdown>
                                  <Dropdown.Toggle variant="icon">
                                    <MdOutlineFileDownload />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      href="#"
                                      onClick={() => {
                                        navigate("/stuff/" + brand._id);
                                      }}
                                    >
                                      PNG
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      href="#"
                                      onClick={() => {
                                        DownloadToSvg(brand.url, brand.title);
                                      }}
                                    >
                                      SVG
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                                {user?.email ? (
                                  <button
                                    type="button"
                                    className="btn-icon"
                                    onClick={() => {
                                      setModalShow(true);
                                      setAddImageToCollection(brand._id);
                                      setIndexToaddToFav(index);
                                    }}
                                  >
                                    <BookmarkIcon />
                                  </button>
                                ) : (
                                  ""
                                )}
                              </div>
                            </Card>
                          </div>
                        );
                      })}

                      {user && (email === user.email || isShared == true) && (
                        // <Link to="/addfile" className="add-new" state={{ domain: domain }}>
                        <div className="add-new">
                          <Card
                            className="item border-0 box-shadow"
                            onClick={() => handleShow()}
                          >
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
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    {allColor[0]?.colorValue &&
                      allColor[0]?.colorValue != "" && <h5>Colors</h5>}

                    {allColor != "" && (
                      <div className="d-flex colors-wrp">
                        {allColor?.map((color, index) => {
                          return (
                            <div className="color-item box-shadow" key={index}>
                              {color.colorValue != "" && (
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
                              )}
                            </div>
                          );
                        })}
                      </div>
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
                          <div
                            key={index}
                            style={{ fontFamily: link, fontSize: "24px" }}
                            className="card p-2 m-1"
                          >
                            <Helmet>
                              <link
                                className="fontUrl"
                                rel="stylesheet"
                                href={`https://fonts.googleapis.com/css2?family=${link}`}
                              />
                            </Helmet>
                            <a
                              href={`https://fonts.google.com/specimen/${link}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color: "black", textDecoration: "none" }}
                            >
                              {link}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-5">
                    {ImgSections?.map((img, index) => {
                    
                      return (
                       <Card
                      key={img._id + index}
                      className=""
                      style={{ width: "200px", marginTop: "3px" }}
                    >
                     
                      <div className="img-size h-100">
                        <img src={img?.imageValue} alt="" />
                        <h5>{img?.imageName}</h5>
                      </div>
                    </Card>
                      );
                    })}
                  </div>
                  <div className="mt-5">
                    {TextSections?.map((text, index) => {
                      return (
                        <div key={text._id + index} className="item">
                          <h5>{text?.textName}</h5>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: text?.textValue,
                            }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>

                  {/* <div className="mt-5">
                    {guidlines?.length > 12 ? <h5>Guidelines</h5> : ""}
                    <div dangerouslySetInnerHTML={{ __html: guidlines }}></div>
                  </div> */}
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

            <Modal
              size="xl"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={showJson}
              onHide={handleCloseJson}
            >
              <Modal.Header closeButton>
                <Modal.Title>{title?.title} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <JsonModel
                  data={CompanyData}
                  id={title?.title}
                  show={"Company"}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseJson}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="mb-5"></div>
          </Container>
        </div>
      )}
    </>
  );
}

export default Company;
