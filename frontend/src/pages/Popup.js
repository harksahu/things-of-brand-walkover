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
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate, useParams } from "react-router-dom";
import Draggable, { DraggableCore } from 'react-draggable';
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  searchBrandApi,
  deleteMyStuffAPI,
  sendMydeleteStuffAPI,
  restoreMyStuffAPI,
  saveMyStuffAPI,
} from "../api/index.js";
import { async } from "@firebase/util";

function MyVerticallyCenteredModal(params) {
  const id = useParams();  
  const navigate = useNavigate();
  const [mwidth, setWidth] = useState(250);
  const [name, setName] = useState("");
  const [mheight, setHeight] = useState(250);  
  const { user } = UserAuth();
  const [show, setShow] = useState(false);

  const handleHide = () => setShow(false);
  const handleShow = () => setShow(true);
  // const debounceOnChange = React.useCallback(debounce(savedata, 400), []);

  const [fullscreen, setFullscreen] = useState(true);
  const [props, setProps] = useState();
  console.log(props);
  // console.log(props?.email)
  // console.log(user?.email)
  function size(img) {
    setWidth(document.getElementById(img).clientWidth);
    setHeight(document.getElementById(img).clientHeight);
  }

  const savedata = async (id, n) => {
    setName(n)
    const new_data = {
      _id: id,
      title: n,
    };
    await saveMyStuffAPI(new_data);
  }

  function changeHW(w, h) {
    document.getElementById(props.url).style.width = w + "px";
    document.getElementById(props.url).style.height = h + "px";
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
      saveAs(pngUrl);
    });
  };

  const getData = async () => {
    const data = await searchBrandApi(id.id);
    setProps(data?.data?.data[0]);
    // console.log(props);
  };

  function Set_Name() {    
    console.log(name);
    if (name === "") {
      setName(props.title);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container fluid>      
      <Row className="h-90">
        <Col className="popup_img">
          <SvgInline {...props} />
        </Col>        
      </Row>  
      <Draggable defaultPosition={{x: 60, y: 60}}>
        <div className="card property-box">          
          <div class="card-header d-flex align-items-center">
            Properties
            <Dropdown className="ms-auto">
              <Dropdown.Toggle variant="light" size="sm">
                <BsThreeDotsVertical />            
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Rename</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>                
              </Dropdown.Menu>
            </Dropdown>            
          </div>
          <div className="card-body">
            <div>
              { user !== null && user !== undefined && user && Object.keys(user).length > 0 ?
                (
                  user?.email === props?.email ? (
                    <input 
                      type="text"
                      placeholder={props.title}
                      onClick={() => {
                        console.log("object");
                        Set_Name();
                      }}
                      onChange={(e) => {
                        (savedata(props._id, e.target.value))
                      }}
                      value={name}
                    ></input>
                  ) : ( "" )
                ) : ( "")
              }
            </div>
                
            <label className="small fw-bold mb-1">Size</label>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>W</Form.Label>
                  <Form.Control
                    onChange={(e) => (setWidth(e.target.value), changeHW(e.target.value, mheight))}
                    value={mwidth}
                    size="sm"
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
                    onChange={(e) => (setHeight(e.target.value), changeHW(mwidth, e.target.value))}
                    value={mheight}
                    size="sm"
                  />
                </Form.Group>
              </Col>
            </Row>
            { user !== null &&
              user !== undefined &&
              user &&
              Object.keys(user).length > 0 ? (
                user?.email === props?.email ? (
                  <>
                    <Button
                      onClick={async () => {
                        const new_data = {
                          _id: props.user._id,
                          title: name,
                        };
                        await saveMyStuffAPI(new_data);
                        alert("saved");
                        window.location.reload();
                      }}
                      variant="outline-secondary"
                      size="sm"
                    >
                      save
                    </Button>
                    
                    { props.active === false ? (
                      <Button
                        onClick={async () => {
                          console.log("object");
                          await restoreMyStuffAPI(props?._id);
                          // alert("restore")
                          navigate(-1);
                        }}
                        variant="outline-secondary"
                        size="sm"
                      >
                        Restore
                      </Button>
                      ) : (
                      <Button
                        onClick={async () => {
                          await deleteMyStuffAPI(props?._id);
                          // alert("Deleted");
                          // window.location.reload();
                          navigate(-1);
                        }}
                        variant="outline-secondary"
                        size="sm"
                      >
                        delete
                      </Button>
                    )}
                  </>
                ) : ( "" )
              ) : ( "" )              
            }
            <div className="mt-4 mb-1">
              <label className="small fw-bold">Download</label>
            </div>
            <Button
              variant="outline-secondary"
              size="sm"
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
    </Container>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button onClick={props.onHide}>Close</Button>
    //     </Modal.Footer>
    //   </Modal>
  );
}

export default MyVerticallyCenteredModal;