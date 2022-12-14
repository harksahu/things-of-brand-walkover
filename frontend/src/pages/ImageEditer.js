import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Button, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import saveAs from "file-saver";
import { Canvg, presets } from "canvg";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../utils/SvgInLine.css";
import "../scss/popup.scss";
import SvgInline from "../utils/SvgInLine.js";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Draggable from "react-draggable";
import { BsThreeDotsVertical } from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  searchBrandApi,
  deleteMyStuffAPI,
  getProfileDetails,
  restoreMyStuffAPI,
  saveMyStuffAPI,
} from "../api/Index.js";
import ClipLoader from "react-spinners/ClipLoader";
import DeleteComponent from "../components/DeleteComponent"

function ImageEditer() {
  const id = useParams();
  const navigate = useNavigate();
  const { key } = useLocation();
  const [mwidth, setWidth] = useState(250);
  const [name, setName] = useState("");
  const [mheight, setHeight] = useState(250);
  const { user } = UserAuth();
  const [show, setShow] = useState(false);
  const [props, setProps] = useState();
  const [loading, setLoading] = useState(true);
  const [ViewBox, setViewBox] = useState();
  const [ratio, setRatio] = useState();
  const [msgForAlert, setMsgForAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const savedata = async (id, n) => {
    setName(n);
    const new_data = {
      _id: id,
      title: n,
    };
    await saveMyStuffAPI(new_data);
  };

  function changeHW(w, h) {
    console.log(w, h);

    document.getElementById(props.url).style.width = w + "px";
    document.getElementById(props.url).style.height = h + "px";
  }

  const DownloadToSvg = async (svg, fileName) => {
    // var svg = document.querySelector("svg");
    // var xml = new XMLSerializer().serializeToString(svg);
    // var svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
    // var b64start = "data:image/svg+xml;base64,";
    // var image64 = b64start + svg64;
    saveAs(svg, fileName);
  };

  const DownloadToPng = async (img, w, h, fileName) => {
    if (w === undefined) {
      const x = document.getElementById(img).clientWidth;
      setWidth(x);
      w = x;
    }
    if (h === undefined) {
      const y = document.getElementById(img).clientHeight;
      setHeight(y);
      h = y;
    }

    const preset = presets.offscreen();

    async function toPng(data) {
      const { width, height } = data;
      // console.log(width);
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
      saveAs(pngUrl, fileName);
    });
  };

  const getData = async () => {
    const data = await searchBrandApi(id.id);
    setProps(data?.data?.data[0]);
    setName(data?.data?.data[0]?.title);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Go to company page
    </Tooltip>
  );

  const companyPage = async () => {
    // console.log(props?.domain);

    const forwardTo = await getProfileDetails({
      email: "",
      domain: "",
      name: "",
      searchfrom: "false",
      _id: props?.domain,
    });
    // console.log(forwardTo?.data?.data[0]?.domain);

    const moveTo = "/" + forwardTo?.data?.data[0]?.domain
    navigate(moveTo);
  };




  function reduce(numerator, denominator) {
    var gcd = function gcd(a, b) {
      return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(numerator, denominator);
    return [numerator / gcd, denominator / gcd];
  }


  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, [id]);



  useEffect(() => {
    if (ViewBox?.width) {
      setRatio(reduce(ViewBox?.width, ViewBox?.height))
      setWidth(ViewBox?.width)
      setHeight(ViewBox?.height)
    }
  }, [ViewBox]);

  return (
    <>
      {loading ? <div className="center-loader"><ClipLoader /></div> :
        <Container fluid>
          <DeleteComponent
            show={modalShow}
            msg={msgForAlert}
            setmodalshow={setModalShow}
            onSubmit={() => {
              msgForAlert == "Delete" ?
                deleteMyStuffAPI(idToDelete)
                : restoreMyStuffAPI(idToDelete);
              navigate(-1)
            }} />
          <Row className="h-90">
            <Col className="popup_img">
              <div className="d-flex" style={{ position: "absolute" }}>
                <Button
                  style={{ margin: 10, zIndex: 1 }}
                  onClick={() => {
                    if (key === "default") {
                      navigate('/');
                    } else {
                      navigate(-1);
                    }
                  }}
                  variant="dark"
                >
                  Back
                </Button>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <Button
                    style={{ margin: 10, zIndex: 1 }}
                    onClick={() => {
                      companyPage();
                    }}
                    variant="dark"
                  >
                    Company page
                  </Button>
                </OverlayTrigger>
              </div>

              <SvgInline {...props} ViewBox={ViewBox} setViewBox={setViewBox} />

            </Col>

            <div style={{ position: "absolute" }}>
              <Draggable defaultPosition={{ x: window.innerWidth - 350, y: 10 }}>
                <div className="card property-box" style={{ cursor: "grab" }}>
                  <div className="card-header d-flex align-items-center">
                    {user !== null &&
                      user !== undefined &&
                      user &&
                      Object.keys(user).length > 0 ? (
                      user?.email === props?.email ? (
                        <div>
                          {show ? (
                            <input
                              id="userInputBox"
                              onChange={(e) => {
                                savedata(props?._id, e.target.value);
                              }}
                              value={name}
                              className="form-control form-control-sm"
                              autoFocus
                            />
                          ) : (
                            <div
                              id="showname"
                              onClick={() => {
                                setShow(true);
                              }}
                            >
                              {name}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>{props?.title}</div>
                      )
                    ) : (
                      <div>{props?.title}</div>
                    )}
                    {user !== null &&
                      user !== undefined &&
                      user &&
                      Object.keys(user).length > 0 && (
                        user?.email === props?.email && (
                          <>
                            <Dropdown className="ms-auto">
                              <Dropdown.Toggle variant="light" size="sm">
                                <BsThreeDotsVertical />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => {
                                    setShow(true);
                                  }}
                                >
                                  Rename
                                </Dropdown.Item>
                                {props.active === false ? (
                                  <Dropdown.Item
                                    onClick={async () => {
                                      setModalShow(true);
                                      setIdToDelete(props?._id)
                                      setMsgForAlert("Restore")
                                    }}
                                    variant="outline-secondary"
                                    size="sm"
                                  >
                                    Restore
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    onClick={async () => {
                                      setModalShow(true);
                                      setIdToDelete(props?._id)
                                      setMsgForAlert("Delete")
                                    }}
                                    variant="outline-secondary"
                                    size="sm"
                                  >
                                    Delete
                                  </Dropdown.Item>
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                          </>
                        )
                      )
                    }
                  </div>
                  <div className="card-body">
                    <label className="small fw-bold mb-1">Size</label>
                    <Row>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>W</Form.Label>
                          <Form.Control
                            onChange={(e) => (
                              setWidth(e.target.value),
                              setHeight(Number((ratio[1] / ratio[0]) * e.target.value).toFixed(2)),
                              changeHW(e.target.value, (ratio[1] / ratio[0]) * e.target.value)
                            )}
                            value={mwidth}
                            size="sm"
                            autoComplete="off"
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
                            onChange={(e) => (
                              setHeight(e.target.value),
                              setWidth(Number((ratio[0] / ratio[1]) * e.target.value).toFixed(2)),
                              changeHW((ratio[0] / ratio[1]) * e.target.value, e.target.value)
                            )}
                            value={mheight}
                            size="sm"
                            autoComplete="off"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="mt-4 mb-1">
                      <label className="small fw-bold">Download</label>
                    </div>
                    <Button
                      variant="outline-secondary"
                      size="sm me-4"
                      onClick={() => {
                        DownloadToPng(document.getElementById("largeImage").innerHTML, mwidth, mheight, props?.title);
                      }}
                      className=""
                    >
                      PNG
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => {
                        DownloadToSvg(props.url, props.title);
                      }}
                    // onClick={() => saveAs(props.title)}
                    >
                      SVG
                    </Button>
                  </div>
                </div>
              </Draggable>
            </div>
          </Row>
        </Container>
      }
    </>

    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button onClick={props.onHide}>Close</Button>
    //     </Modal.Footer>
    //   </Modal>
  );
}

export default ImageEditer;
