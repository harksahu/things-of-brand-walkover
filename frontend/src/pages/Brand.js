import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import "../utils/svginline.css";
import "./home.scss";
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
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from 'react-bootstrap/Accordion';

import { getCompanyDetails } from '../api/index.js';

import { BsFillPlusCircleFill, BsPencilSquare, BsFillExclamationDiamondFill, BsShieldCheck } from "react-icons/bs";


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
  //   // console.log(TXT?.data?.data[0][0]);
  //   // console.log(TXT?.data?.data);
  //   var ifVerify = false;
  //   for (let i = 0; i < TXT?.data?.data.length; i++) {
  //     // text += cars[i] + "<br>";
  //     // console.log(TXT?.data?.data[i][0]);
  //     if (TXT?.data?.data[i][0] == verify) {
  //       updateVerify("true");
  //       ifVerify = true;
  //       break;
  //     } else {
  //       console.log("not verify");
  //     }
  //   }
  //   if (!ifVerify) {
  //     document.getElementById("error").innerHTML = "not verify";
  //   }
  //   // console.log(TXT?.data?.data[i] == "abcdefghijklmnop");
  //   // console.log(verify)
  // };

  async function makeid(length) {
    console.log("in make id ");
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (verify == undefined || verify == null || verify === "false") {
      console.log(verify);
      setVerify(result);
      console.log("verification code in condtion = " + result + verify);

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
    console.log(verify);
    if (verify === undefined || verify === null || verify === "false") {
      await updateProfileFields(data);
    }
  };

  const title = useParams();
  const getbrandslogo = async () => {
    console.log(domain);
    if (domain) {
      const data = await sendSearchAPI({ domain: id, active: 1 });
      console.log(data);
      setDomainPost(data?.data?.data);
    }
  };

  const getbrand = async () => {
    const fresult = await getProfileDetails({
      domain: title.title,
      searchfrom: true,
    });
    console.log(fresult);
    console.warn(fresult.data.data[0]);
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
    // console.log(fresult.data.data[0].sharedEmail, "shared email");

    if (fresult.data.data[0].aboutus.length) {
      document.getElementById("aboutus").innerHTML = fresult.data.data[0].aboutus;
    }

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
    console.log("data in updatelogo", data);
    await updateProfileFields(data);
  };

  useEffect(() => {
    getbrand();
    if (domain) {
      getbrandslogo();
      console.log(logo);
    }
  }, [domain,title]);



  return (
    <>

      {console.log("all color = ", allColor)}
      {domain ? (
        <div className="m-5">
          <Button onClick={() => {
            navigate(-1)
          }} variant="dark">Back</Button>
          {user ? (
            email === user.email ? (
              <>
                <Link to={"/addfile"}>
                  <BsFillPlusCircleFill style={{ float: "right", fontSize: 40 }} />
                </Link>
                <Button variant="primary" style={{ float: "right" }} onClick={handleShoww}>
                  Share
                </Button>

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
                      console.log("e.target.value", setSharedEmail);
                      console.log("new shared emials", temp);
                      temp.push(email);
                      setSharedEmail([...temp]);
                      handleClosee();
                      updateLogo();
                    }}>
                      Share
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Link to="/profile" state={{ data: company }}>
                  <BsPencilSquare style={{ float: "right", fontSize: 40, color: "black" }} />
                </Link>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <div>
            <h1>{name}</h1>
          </div>
          <div id="aboutus"></div>
          <div>{links}</div>
          <br />
          <div>
            <a
              href={"https://" + domain}
              target="_blank"
              rel="noopener noreferrer"
            >
              {domain}
            </a>
            {user ? (
              email === user.email ? (
                verify === "true" ? (
                  <BsShieldCheck />
                ) : (
                  <>
                    {" "}
                    <BsFillExclamationDiamondFill />
                    <Link to="/domainVerify" state={{ data: company }}>
                    
                    <button
                      className="m-auto btn btn-primary"
                      onClick={() => {
                        handleShow();
                      }}
                    >
                      verify
                    </button>
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
          <br />
          <div>
            Guidelines
            <p>
              <a target="_blank" rel="noopener noreferrer">
                {" "}
                How to create ads
              </a>
            </p>
            <p>
              <a target="_blank" rel="noopener noreferrer">
                {" "}
                How to use fonts
              </a>
            </p>
          </div>
          <div>
            <h5>Logos</h5>
            <div className="d-flex flex-wrap justify-content-center">
              {DomainPost?.map((brand, index) => {
                // console.log(brand);
                return (
                  <div key={index}>
                    <div key={brand._id} className=" flex-wrap item">
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
                              console.log("brand.url", brand.url);
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
          <div>
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
          <br />
          <div>
            <h5>Colors</h5>

            {allColor?.map(color => {
              return (
                <div>
                  <h4>{color.colorName}</h4>
                  <div
                    id="background"
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: color.colorValue,
                      margin: 5,
                    }}
                  ></div>
                </div>
              )
            })}

          </div>
        </div>
      ) : (
        <Not_found />
      )
      }

    </>
  );
}

export default Brand;


