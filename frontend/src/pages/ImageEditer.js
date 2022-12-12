import react from "react";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Button, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import saveAs from "file-saver";
import { Canvg, presets } from "canvg";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../utils/svginline.css";
import "../scss/popup.scss";
import SvgInline from "../utils/SvgInline.js";
import { useNavigate, useParams } from "react-router-dom";
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
} from "../api/index.js";
import ClipLoader from "react-spinners/ClipLoader";


function MyVerticallyCenteredModal(params) {
  const id = useParams();
  const navigate = useNavigate();
  const [mwidth, setWidth] = useState(250);
  const [name, setName] = useState("");
  const [mheight, setHeight] = useState(250);
  const { user } = UserAuth();
  const [show, setShow] = useState(false);
  const [props, setProps] = useState();
  const [loading, setLoading] = useState(false);
  function size(img) {
    setWidth(document.getElementById(img).clientWidth);
    setHeight(document.getElementById(img).clientHeight);
  }

  const savedata = async (id, n) => {
    setName(n);
    const new_data = {
      _id: id,
      title: n,
    };
    await saveMyStuffAPI(new_data);
  };

  function changeHW(w, h) {
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

  const DownloadToPng = async (img, w, h) => {
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

  const getData = async () => {
    const data = await searchBrandApi(id.id);
    setProps(data?.data?.data[0]);
    setName(data?.data?.data[0].title);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Go to company page
    </Tooltip>
  );

  const companyPage = async () => {
    const forwardTo = await getProfileDetails({
      email: "",
      domain: "",
      name: "",
      searchfrom: "true",
      _id: props?.domain,
    });

    navigate("/" + forwardTo?.data?.data[0]?.domain);
  };
  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, [id]);

  return (
    <>
    {loading?<ClipLoader/>:
    <Container fluid>
      <Row className="h-90">
        <Col className="popup_img">
          <div className="d-flex" style={{ position: "absolute" }}>
            <Button
              style={{ margin: 10, zIndex: 1 }}
              onClick={() => {
                navigate(-1);
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

          <SvgInline {...props} />
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
                Object.keys(user).length > 0 ? (
                  user?.email === props?.email ? (
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
                                await restoreMyStuffAPI(props?._id);
                                // alert("restore")
                                navigate(-1);
                              }}
                              variant="outline-secondary"
                              size="sm"
                            >
                              Restore
                            </Dropdown.Item>
                          ) : (
                            <Dropdown.Item
                              onClick={async () => {
                                await deleteMyStuffAPI(props?._id);
                                // alert("Deleted");
                                // window.location.reload();
                                navigate(-1);
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
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
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
                          changeHW(e.target.value, mheight)
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
                          changeHW(mwidth, e.target.value)
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
                    DownloadToPng(props.url, mwidth, mheight);
                  }}
                  className=""
                >
                  PNG
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => {
                    const canvas = DownloadToSvg(props.url, props.title);
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

export default MyVerticallyCenteredModal;
