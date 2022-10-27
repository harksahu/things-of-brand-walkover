import react from "react";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import saveAs from "file-saver";
import { Canvg, presets } from "canvg";
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../utils/svginline.css";
import "./popup.css"
import SvgInline from "../utils/SvgInline.js";
import { useLocation, useNavigate} from "react-router-dom";

function MyVerticallyCenteredModal(params) {
  // const params = useParams();
  // const props= params;
  const navigate = useNavigate();
  const [mwidth, setWidth] = useState(250);

  const [mheight, setHeight] = useState(250);

  const [fullscreen, setFullscreen] = useState(true);

  const location = useLocation();
  const props = location.state;
  // console.log(props);

  function size(img) {
    setWidth(document.getElementById(img).clientWidth);
    setHeight(document.getElementById(img).clientHeight);
  }

  function changeHW() {
    document.getElementById(props.url).style.width = mwidth + "px";
    document.getElementById(props.url).style.height = mheight + "px";
  }

  const DownloadToSvg = async (svg ,fileName) => {
    var svg = document.querySelector('svg');
    var xml = new XMLSerializer().serializeToString(svg);
    var svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
    var b64start = 'data:image/svg+xml;base64,';
    var image64 = b64start + svg64;
    saveAs( image64,fileName);

  }

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
        await v.render();=
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

    return (
      //   <Modal fullscreen={fullscreen}
      //     {...props}
      //     fullscreen = {true}
      //     aria-labelledby="contained-modal-title-vcenter"
      //     centered
      //   >
      //     <Modal.Header closeButton>
      //       <Modal.Title id="contained-modal-title-vcenter">
      //         {props.title}
      //       </Modal.Title>

      //     </Modal.Header>

      //     <Modal.Body>
      <Container fluid>
      <Row className="h-100">
        <Col className="popup_img">          
          <SvgInline {...props} />
        </Col>        
        <Col className="rightbar">
          <div>
            <button className="tob-btn-trans" onClick={() => navigate(-1)}>
              <span class="material-symbols-rounded d-block">
                close
              </span>
            </button>
          </div>
          <label className="small fw-bold mb-1">Size</label>
          <Row>


          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>W</Form.Label>
              <Form.Control                 
                  onChange={(e) => setWidth(e.target.value)}                    
                  value={mwidth}
                  size="sm"
                />
            </Form.Group>            
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>H</Form.Label>
              <Form.Control
                onChange={(e) => setHeight(e.target.value)}
                value={mheight}
                size="sm"
              />
            </Form.Group>          
          </Col>
          </Row>
                
                
                <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => changeHW()}
          >
            Show
          </Button>{" "}
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
          </Button>{" "}
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              const canvas = DownloadToSvg(props.url,props.title);
            }}
            // onClick={() => saveAs(props.title)}
          >
            SVG
          </Button>{" "}          
        </Col>
      </Row>
      </Container>
      //     </Modal.Body>
      //     <Modal.Footer>
      //       <Button onClick={props.onHide}>Close</Button>
      //     </Modal.Footer>
      //   </Modal>
    );
  };


export default MyVerticallyCenteredModal;
