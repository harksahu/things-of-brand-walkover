import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {Container, Row, Form, Col, Navbar, Nav, Card, Figure, Button, Modal, ListGroup} from "react-bootstrap";
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
import { BsFillPlusCircleFill, BsPencilSquare, BsFillExclamationDiamondFill, BsShieldCheck } from "react-icons/bs";
import { MdArrowBackIos, MdVerified, MdShare, MdOutlineModeEdit } from "react-icons/md";

function Not_found() {
  return (
    <div className="not-found">
      Not found
    </div>
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
  const [showUploadFile, setShowUploadFile] = useState(false);
  const handleShowUploadFile = () => setShowUploadFile(true);
  const handleCloseUploadFile = () => setShowUploadFile(false);
  const [mwidth, setWidth] = useState(250);
  const [mheight, setHeight] = useState(250);
  const [fullscreen, setFullscreen] = useState(true);

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
      // console.log(data?.data?.data[0].url);
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
    setFontLink(fresult.data.data[0].fontLink);
    // setPrimaryColors(fresult.data.data[0].PrimaryColors);
    // setSecondaryColors(fresult.data.data[0].secondaryColors);
    // setBackgroundColors(fresult.data.data[0].backgroundColors);
    setAllColor(fresult.data.data[0].color);
    setlogo(fresult.data.data[0].logo);
    setEmail(fresult.data.data[0].email);
    setVerify(fresult.data.data[0].verify);
    setSharedEmail(fresult.data.data[0].sharedEmail);    
    /* if (fresult.data.data[0].aboutus.length) {
      document.getElementById("aboutus").innerHTML = fresult.data.data[0].aboutus;
    } */

    //getbrandslogo();    
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
    // console.log(sharedEmail);
 
    await updateProfileFields(data);
  };

  // function myFunction() {
  
  //   var copyText = document.getElementById("background");
  
    
  //   copyText.select();
  //   copyText.setSelectionRange(0, 99999); 
  
    
  //   navigator.clipboard.writeText(copyText.value);
    
    
  //   alert("Copied the text: " + copyText.value);
  // }

  useEffect(() => {
    getbrand();
    if (domain) {
      getbrandslogo();      
    }
  }, [domain, title]);

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
                        
                            <Form>
                              <Modal.Body>
                          {/* <input type="email" name="email"
                          placeholder="Enter the email" id="addEmail" /> */}
                             <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" id="addEmail" placeholder="Enter email" />
                        
                          {/* <ListGroup variant="flush">
                            {sharedEmail?.map((email) => {                                         
                              <ListGroup.Item>{email}</ListGroup.Item>
                            })}                            
                          </ListGroup> */}

                          {sharedEmail.map((email) => {
                            return(
                              <div key ={email}>
                              <h5>{email}</h5>
                              </div>
                            );
                          
                          })}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClosee}>
                            Close
                          </Button>
                          <Button type="submit" variant="primary" onClick={() => {
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
            <div>
              {name?
              <h1>{name}</h1>:""
              }
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
              }
              )
              }
     
            </div>          
          
          <div className="mt-5">
            <h5>Logos</h5>                        
            <div className="grid">     
            {/* {console.log(DomainPost[0].url)}          */}
              {DomainPost?.map((brand, index) => {
                return (

                  <div key={brand._id} className="item">
                      <Card className="box-shadow">
                        <Link to={"/stuff/" + brand._id}>
                          <div
                            style={{ overflow: "auto" }}
                            className="img_size"
                          >
                            {/* {console.log(brand.url)} */}
                            <SvgInline {...brand} />
                            {/* <SvgInline {...brand.url} /> */}
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
                          <Card.Footer className="text-muted justify-content-between d-flex">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => {
                                const canvas = DownloadToSvg(brand.url, brand.title);
                              }}
                            >
                              Download
                            </Button>
                            {user ? (
                              email === user.email ? (
                                logo === brand.url ? (
                                  <Button
                                    variant="light"
                                    size="sm"
                                    disabled
                                  >
                                    Default logo
                                  </Button>
                                ) : (
                                  <Button
                                    variant="light"
                                    size="sm"
                                    onClick={() => {
                                      setlogo(brand.url);
                                      updateLogo(brand.url);                              
                                    }}
                                  >
                                    Make default
                                  </Button>
                                )
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </Card.Footer>                                                
                      </Card>                    
                  </div>
                );
              })}
              
              {user ? (
              email === user.email ? (
                <Link to="/addfile" className="add-new item">
                  <Card className="h-100 item-company">                
                    <Card.Body className="align-items-center card-body d-flex justify-content-center">
                      <Card.Title                    
                        className="text-center"
                      >
                        <BsFillPlusCircleFill style={{ fontSize: 40 }} />
                      </Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                    <div className="card-footer">
                      <Button variant="link"
                      size="sm">Add new Logo</Button>
                    </div>
                  </Card>
                </Link>                
              ) : ("")
            ) :("")}
            </div>
          </div>

          <div className="mt-5">
            {allColor[0].colorValue!=''?<h5>Colors</h5>:""}

            {allColor!=''?
            <div className="d-flex colors-wrp">
              {allColor?.map((color ,index)=> {
                return (
                  
                  <div className="color-item box-shadow"
                  key={index}>
                  { color.colorValue!=''?
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
                      <div  >{color.colorName}</div>
                      <div  >{color.colorValue}</div>
                    </div>
                    <button  onClick={() => {  
                      let colorTemp = color.colorValue;
                      console.log(colorTemp);
                       navigator.clipboard.writeText(colorTemp);
                    }}>Copy text</button>
                  
                
                  </div>:""}
                  </div>
                  
                )
                
              })}
            
            </div>:""
}
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
            {fontLink!=''?<h5>Fonts link</h5>:""}
            {/* {console.log(fontLink)} */}
            {/* <div style={{ fontSize: fontSize + "px" }}>{fontSize + "px"}</div> */}
            {fontLink?.map((link,index) => {
              return (

                <div key ={index}
                
                >

                  {/* <h4>{color.colorName}</h4> */}
                  <a href={link} target="_blank">
                    {link}
                  </a>
                </div>
              );
              // <h1>{color.colorName}</h1>
              // <h1>{color.colorValue}</h1>
            })}
          </div>   
          
          <div className="mt-5">
            {guidlines?<h5>Guidelines</h5>:""}
            <div dangerouslySetInnerHTML={{__html: guidlines}}></div>
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
