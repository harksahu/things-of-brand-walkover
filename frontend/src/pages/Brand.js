import React, { useEffect, useState } from "react";
import { Canvg, presets } from "canvg";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Form,
  Col,
  Navbar,
  Nav,
  Card,
  Figure,
  Button, 
  Modal,
  ListGroup,  
} from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import "../utils/svginline.css";
import "../scss/brand.scss";
import { UserAuth } from "../context/AuthContext";
import {
  getProfileDetails,
  sendSearchAPI,
  updateProfileFields,
  getTXT,
} from "../api/index.js";
import saveAs from "file-saver";
import SvgInline from "../utils/SvgInline.js";
import {
  BsFillPlusCircleFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsFillExclamationDiamondFill,
  BsShieldCheck,
} from "react-icons/bs";
import {
  MdArrowBackIos,
  MdVerified,
  MdShare,
  MdOutlineModeEdit,
  MdContentCopy
} from "react-icons/md";
import Addfile from "./Addfile";

function Not_found() {
  
 
  return <div className="not-found">Not found</div>;
}

function Brand() {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [aboutus, setAboutus] = useState();
  const [domain, setDomain] = useState();
  const [logo, setlogo] = useState();
  const [guidlines, setGuidlines] = useState();
  const [fontSize, setFontSize] = useState();
  const [email, setEmail] = useState();
  const [sharedEmail, setSharedEmail] = useState([]);
  const { user } = UserAuth();
  const [links, setLinks] = React.useState([]);
  // const [results, setResults] = useState();
  const [DomainPost, setDomainPost] = useState();
  const [verify, setVerify] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [allColor, setAllColor] = useState();
  const [fontLink, setFontLink] = useState([]);
  const [company, setCompany] = useState([]); 
  const navigate = useNavigate();
  const [showw, setShoww] = useState(false);
  const [isShared,setSharedCompany] = useState(false);
  const handleShoww = () => setShoww(true);
  const [showUploadFile, setShowUploadFile] = useState(false);
  const handleShowUploadFile = () => setShowUploadFile(true);
  const handleCloseUploadFile = () => setShowUploadFile(false);
  const [mwidth, setWidth] = useState(250);
  const [mheight, setHeight] = useState(250);
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [isRepeatingEmail, setIsRepeatingEmail] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const handleClosee = () => 
  {
    setIsRepeatingEmail(false);
    setShoww(false);
  }
  async function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (verify == undefined || verify == null || verify === "false") {
      setVerify(result);
      await updateVerify(result);
    }
    return result;
  }

  const removeSharedEmail = (index) => {
    let temp = sharedEmail;
    var spliced = temp.splice(index, 1); 
    setSharedEmail([...temp]);
    updateLogo();
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsRepeatingEmail(false);
    var repeatOrNot =false;
    for (var i = 0; i < sharedEmail?.length; i++) {
        if(event.target.sharingEmail.value == user?.email)
        {
          setUserEmail(true);
        }
      if(event.target.sharingEmail.value ==sharedEmail[i])
      {
        repeatOrNot = true;
        setIsRepeatingEmail(true);
      }
    }
    if(event.target.sharingEmail.value && !repeatOrNot)
    {
      let temp = sharedEmail;
      let email = event.target.sharingEmail.value
      if(email != user?.email)
      {
        temp.push(email);
      }
      setSharedEmail([...temp]);
      updateLogo();
    }
  };

  const DownloadToSvg = async (svg, fileName) => {
    var svg = document.querySelector("svg");
    var xml = new XMLSerializer().serializeToString(svg);
    var svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
    var b64start = "data:image/svg+xml;base64,";
    var image64 = b64start + svg64;
    saveAs(image64, fileName);
  };
  const DownloadToPng = async (img, w, h) => {
    const preset = presets.offscreen();

    async function toPng(data) {
      const { width, height } = data;
      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext("2d");
      const v = await Canvg.from(ctx, img, preset);
      v.resize(width, height, "xMidYMid meet");
      await v.render();
      const blob = await canvas.convertToBlob();
      const pngUrl = URL.createObjectURL(blob);
      return pngUrl;
    }

    toPng({
      width: w,
      height: h,
    }).then((pngUrl) => {
      saveAs(pngUrl);
    });
  };

  const updateVerify = async (result) => {
    const data = {
      name: name,
      aboutus: aboutus,
      logo: logo,
      links: links,
      domain: domain,
      guidlines: guidlines,
      color: allColor,
      email: email,
      verify: result,
    };
    if (verify === undefined || verify === null || verify === "false") {
      await updateProfileFields(data);
    }
  };

  const title = useParams();
  const getbrandslogo = async () => {
    if (domain) {
      const data = await sendSearchAPI({ domain: id, active: 1 });
      setDomainPost(data?.data?.data);
    }
  };

  const getbrand = async () => {
 
    const fresult = await getProfileDetails({
      domain: title.title,
      searchfrom: true,
    });
   
    // setResults(fresult.data);

   
    
    setCompany(fresult.data.data[0]);
    setId(fresult.data.data[0]._id);
    setName(fresult.data.data[0].name);
    setAboutus(fresult.data.data[0].aboutus);
    setLinks(fresult.data.data[0].links);
    setDomain(fresult.data.data[0].domain);
    setGuidlines(fresult.data.data[0].guidlines);
    setFontSize(fresult.data.data[0].fontSize);
    setFontLink(fresult.data.data[0].fontLink);
    setAllColor(fresult.data.data[0].color);
    setlogo(fresult.data.data[0].logo);
    setEmail(fresult.data.data[0].email);
    setVerify(fresult.data.data[0].verify);
    setSharedEmail(fresult.data.data[0].sharedEmail);
    
    isCompanyShared();
  };
  
  const isCompanyShared = async(req,res)=>{

    for(var i = 0 ; i<sharedEmail?.length ; i++)
    { 
       
        if(user?.email ===sharedEmail[i])
        {
          setSharedCompany(true);
        }
      }
    }

  const updateLogo = async (logo_url) => {
    const data = {
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
    setLoading(true);
    getbrand();
    if (domain) {
      getbrandslogo();
      setLoading(false);
    }
  }, [domain, title,user]);

  return (
    <>
    {loading?<ClipLoader/>:
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
                        navigate(-1);
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
                        <Nav.Link onClick={handleShoww}>
                          <MdShare />
                        </Nav.Link>

                        <Nav.Link
                          as={Link}
                          to="/editProfile"
                          state={{ data: company }}
                        >
                          <MdOutlineModeEdit />
                        </Nav.Link>
                      </Nav>

                        <Modal show={showw} onHide={handleClosee}>
                          <Modal.Header closeButton>
                            <Modal.Title>Share {name ? name : domain}</Modal.Title>
                          </Modal.Header>

                          <Form onSubmit={handleSubmit}>

                            <Modal.Body>
                              {userEmail?<Form.Label>You cant share your company with you</Form.Label>:""}
                              <br></br>
                            {isRepeatingEmail? <Form.Label>Repetation value not allowed </Form.Label>:""}
                           {isRepeatingEmail?<br></br>:""}
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                type="email"
                                id="addEmail"
                                name="sharingEmail"
                                placeholder="Enter email"
                              />

                              <ListGroup variant="flush">
                              {sharedEmail.map((email, index) => {
                              return (
                                <div key={index}>
                                  <h5>{email}
                                  <Button onClick={()=>{
                                    removeSharedEmail(index);
                                  }}><BsFillTrashFill/></Button>
                                  </h5>
                                </div>
                              );
                            })}
                              </ListGroup>                              
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="outline-dark">Copy link</Button>
                              <Button variant="secondary" onClick={handleClosee}>
                                Close
                              </Button>
                              <Button
                                type="submit"
                                variant="primary"
                              >
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
                
              </Container>
            </Navbar>

            <div className="col-lg-12 col-md-12">
              <div>{name ? <h1>{name}</h1> : ""}</div>
              <div className="align-items-center d-flex">
              
                <a
                  href={"https://" + domain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-2"
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
                          to="/domainVerify"                          
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

              <div
                id="aboutus"
                dangerouslySetInnerHTML={{ __html: aboutus }}
              ></div>

              <div>
                {links?.map((link) => {
                  return (
                    <div key={link}>
                      <a target="_blank" href={link}>
                        {link}
                      </a>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5">
                <h5>Logos</h5>
                <div className="grid">
                  {DomainPost?.map((brand, index) => {
                    return (
                      <div key={brand._id} className="item">
                        <Card className="box-shadow">
                          <Link to={"/stuff/" + brand._id}>
                            <div
                              style={{ overflow: "auto" }}
                              className="img_size"
                            >
                              <SvgInline {...brand} />
                            </div>
                            <Card.Body>
                              <Card.Title
                                style={{ textDecoration: "none" }}
                                className="text-center"
                              >
                                {brand.title}
                              </Card.Title>
                            </Card.Body>
                          </Link>
                          <Card.Footer className="text-muted d-flex justify-content-center">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className="me-4"
                              onClick={() => {
                                navigate("/stuff/" + brand._id);
                              }}
                            >
                              PNG
                            </Button>

                            <Button
                              variant="outline-secondary"                              
                              size="sm"
                              onClick={() => {
                                const canvas = DownloadToSvg(
                                  brand.url,
                                  brand.title
                                );
                              }}
                            >
                              SVG
                            </Button>
                          </Card.Footer>
                        </Card>
                      </div>
                    );
                  })}

                  {user ? (
                    email === user.email ? (
                      <Link to="/addfile" className="add-new" state={{domain:domain}}>
                        <Card className="h-100 item-company">
                          <Card.Body className="add-icon align-items-center d-flex justify-content-center">
                            <Card.Title className="text-center">
                              <BsFillPlusCircleFill style={{ fontSize: 40 }} />
                            </Card.Title>
                            <Card.Text></Card.Text>
                          </Card.Body>
                          <Card.Body>
                            <Card.Title>Add New File</Card.Title>
                          </Card.Body>
                          <div className="card-footer">
                            <Button variant="outline-light" size="sm">
                              -
                            </Button>
                          </div>
                        </Card>
                      </Link>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="mt-5">
                {allColor[0].colorValue != "" ? <h5>Colors</h5> : ""}

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
                                  <div className="icon-copy">
                                    <MdContentCopy
                                    onClick={() => {
                                      let colorTemp = color.colorValue;

                                      navigator.clipboard.writeText(colorTemp);
                                      var tooltip = document.getElementById(
                                        "myTooltip" + index
                                      );
                                      tooltip.innerHTML = "Copied: " + colorTemp;
                                    }}
                                    onMouseOut={() => {
                                      var tooltip =
                                        document.getElementById("myTooltip");
                                      tooltip.innerHTML = "Copy to clipboard";
                                    }}
                                    />
                                    <span
                                        className="tooltiptext"
                                        id={`myTooltip${index}`}
                                      >
                                        Copy to clipboard
                                    </span>
                                  </div>
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
                {fontLink != "" ? <h5>Fonts link</h5> : ""}

                {fontLink?.map((link, index) => {
                  return (
                    <div key={index}>
                      <a href={link} target="_blank">
                        {link}
                      </a>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5">
                {guidlines ? <h5>Guidelines</h5> : ""}
                <div dangerouslySetInnerHTML={{ __html: guidlines }}></div>
              </div>
            </div>
          </div>
        ) : (
          <Not_found />
        )}
      </Container>
 } 
    </>
  );
}

export default Brand;
