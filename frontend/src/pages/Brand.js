import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {Container, Row, Form, Col, Navbar, Nav, Card, Figure, Button, Modal} from "react-bootstrap";
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
import { Canvg, presets } from "canvg";
import SvgInline from "../utils/SvgInline.js";
import { BsFillPlusCircleFill, BsPencilSquare, BsFillExclamationDiamondFill, BsShieldCheck } from "react-icons/bs";
import { MdArrowBackIos, MdVerified, MdShare, MdOutlineModeEdit } from "react-icons/md";

function Not_found() {
  return (
    <Figure className="text-center flex justify-cont">
      <Figure.Image
        width={500}
        height={500}
        alt="171x180"
        src="https://i.pinimg.com/564x/f4/e0/d9/f4e0d998d00d96269eeb30c8c625031b.jpg"
      />
      <Figure.Caption>Data not found</Figure.Caption>
    </Figure>
  );
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
  const [results, setResults] = useState();
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
  const handleClosee = () => setShoww(false);
  const handleShoww = () => setShoww(true);
  const [mwidth, setWidth] = useState(250);
  const [mheight, setHeight] = useState(250);

  // const verifyDomain = async () => {
  //   const TXT = await getTXT(domain);
  //   var ifVerify = false;
  //   for (let i = 0; i < TXT?.data?.data.length; i++) {
  //     // text += cars[i] + "<br>";
  //     if (TXT?.data?.data[i][0] == verify) {
  //       updateVerify("true");
  //       ifVerify = true;
  //       break;
  //     } else {
  //     }
  //   }
  //   if (!ifVerify) {
  //     document.getElementById("error").innerHTML = "not verify";
  //   }
  // };

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
      // fontSize: fontSize,
      // fontLink:fontLink,
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
    setCompany(fresult.data.data[0])
    setId(fresult.data.data[0]._id);
    setName(fresult.data.data[0].name);
    setAboutus(fresult.data.data[0].aboutus);
    setLinks(fresult.data.data[0].links);
    setDomain(fresult.data.data[0].domain);
    setGuidlines(fresult.data.data[0].guidlines);
    setFontSize(fresult.data.data[0].fontSize);
    setFontLink(fresult.data.data[0].fontLink)
    // setPrimaryColors(fresult.data.data[0].PrimaryColors);
    // setSecondaryColors(fresult.data.data[0].secondaryColors);
    // setBackgroundColors(fresult.data.data[0].backgroundColors);
    setAllColor(fresult.data.data[0].color)
    setlogo(fresult.data.data[0].logo);
    setEmail(fresult.data.data[0].email);
    setVerify(fresult.data.data[0].verify);
    setSharedEmail(fresult.data.data[0].sharedEmail);

    /* if (fresult.data.data[0].aboutus.length) {
      document.getElementById("aboutus").innerHTML = fresult.data.data[0].aboutus;
    } */

    getbrandslogo();
  };


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
    getbrand();
    if (domain) {
      getbrandslogo();      
    }
  }, [domain,title]);



  return (
    <>
      <Container>
      {domain ? (
        <div className="row mt-4">
          <Navbar>
            <Container>          
              <Nav className="me-auto">
                <Navbar.Brand className="me-auto">
                  <Button variant="outline-dark" onClick={() => { navigate(-1)}}>
                    <MdArrowBackIos />
                  </Button>
                </Navbar.Brand>                            
              </Nav>

                {user ? (
                  email === user.email ? (
                    <>
                      <Nav className="nav-action">
                        <Nav.Link onClick={handleShoww}>
                          <MdShare />
                        </Nav.Link>

                        <Nav.Link as={Link} to="/profile" state={{ data: company }}>
                          <MdOutlineModeEdit />
                        </Nav.Link>
                      </Nav>

                      <Modal show={showw} onHide={handleClosee}>
                        <Modal.Header closeButton>
                          <Modal.Title>Share Your Company</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><input type="email"
                          placeholder="Enter the email" id="addEmail" /></Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClosee}>
                            Close
                          </Button>
                          <Button variant="primary" onClick={() => {
                            let temp = sharedEmail;
                            let email = document.getElementById("addEmail").value;
                            temp.push(email);
                            setSharedEmail([...temp]);
                            handleClosee();
                            updateLogo();
                          }}>
                            Share
                          </Button>
                        </Modal.Footer>
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
            <div>
              <h1>{name}</h1>
            </div>
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
                      <Link to="/domainVerify"
                        target="_blank"
                        className="text-sm"
                        state={{ data: company }}
                        onClick={() => {
                          handleShow();
                        }}
                      >How to verify domain?</Link>
                    </>
                  )
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>

            <div id="aboutus" dangerouslySetInnerHTML={{__html: aboutus}}>            
            </div>
          
            <div>            
              {links?.map((link) => {           
                return(<div key={link}><a target="_blank" href={link}>{link}</a></div>)
              })}
            </div>          
          
          <div className="mt-5">
            <h5>Logos</h5>
            
            {user ? (
              email === user.email ? (
                <Link to={"/addfile"}>
                  <BsFillPlusCircleFill style={{ float: "right", fontSize: 40 }} />
                </Link>     
              ) : ("")
            ) :("")}

            <div className="d-flex flex-wrap justify-content-center">              
              {DomainPost?.map((brand, index) => {
                return (
                  <div key={brand._id}>
                    <div className=" flex-wrap item">
                      <Card>
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
                        <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => {
                                      const canvas = DownloadToSvg(brand.url, brand.title);
                                    }}
                                  >
                                    Download Svg
                        </Button>
                        <Card.Text>
                          {/* <Accordion>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Edit</Accordion.Header>
                              <Accordion.Body>
                                <div className="card-body">
                                  <label className="small fw-bold mb-1">Size</label>

                                  <Col>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlInput1"
                                    >
                                      <Form.Label>W</Form.Label>
                                      <Form.Control
                                        onChange={(e) => (setWidth(e.target.value))}
                                        value={mwidth}
                                        size="sm"
                                        autocomplete="off"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlInput1"
                                    >
                                      <Form.Label>H</Form.Label>
                                      <Form.Control
                                        onChange={(e) => (setHeight(e.target.value))}
                                        value={mheight}
                                        size="sm"
                                        autocomplete="off"
                                      />
                                    </Form.Group>
                                  </Col>

                                  <div className="mt-4 mb-1">
                                    <label className="small fw-bold">Download</label>
                                  </div>
                                  <Button
                                    variant="outline-secondary"
                                    size="sm me-4"
                                    onClick={() => {
                                      DownloadToPng(brand.url, mwidth, mheight);
                                    }}
                                    className=""
                                  >
                                    PNG
                                  </Button>
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => {
                                      // const canvas = DownloadToSvg(brand.url, brand.title);
                                      saveAs(brand.url, brand.title);

                                      // const canvas = DownloadToSvg
                                    }}
                                  // onClick={() => saveAs(props.title)}
                                  >
                                    SVG Code
                                  </Button>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion> */}


                        </Card.Text>
                      </Card>
                    </div>
                    {user ? (
                      email === user.email ? (
                        logo === brand.url ? (
                          <button
                            className="d-flex m-auto btn btn-success"
                            disabled
                          >
                            default logo
                          </button>
                        ) : (
                          <button
                            className="d-flex m-auto btn btn-primary"
                            onClick={() => {
                              setlogo(brand.url);
                              updateLogo(brand.url);                              
                            }}
                          >
                            Make default
                          </button>
                        )
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <h5>Colors</h5>
            <div className="d-flex colors-wrp">
              {allColor?.map(color => {
                return (
                  <div className="color-item box-shadow">
                    <div
                      id="background"
                      style={{
                        width: 150,
                        height: 150,
                        backgroundColor: color.colorValue,                      
                      }}
                    ></div>
                    <div className="color-footer">
                      <div>{color.colorName}</div>
                      <div>{color.colorValue}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            {/* map function to use here */}
            <div className="d-flex">
              {/* <div
                id="primary"
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: PrimaryColors,
                  margin: 5,
                }}
              ></div>
              <div
                id="secondary"
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: secondaryColors,
                  margin: 5,
                }}
              ></div> */}
            </div>
          </div>
          
          <div className="mt-5">
            <h5>Fonts link</h5>
            {/* <div style={{ fontSize: fontSize + "px" }}>{fontSize + "px"}</div> */}
            {fontLink?.map(link => {
              return (
                <div>
                  {/* <h4>{color.colorName}</h4> */}
                  <a href={link} target="_blank">{link}</a>
                </div>
              )
              // <h1>{color.colorName}</h1>
              // <h1>{color.colorValue}</h1>
            })}
          </div>   
          
          <div className="mt-5">
            <h5>Guidelines</h5>            
          </div>

          </div>          
        </div>
      ) : (
        <Not_found />
      )
      }
    </Container>
    </>
  );
}

export default Brand;


