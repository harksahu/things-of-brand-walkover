import react from 'react';
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { sendBrandAPI } from "../api";
import saveas from "file-saver";
import { Canvg, presets } from "canvg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import "../utils/svginline.css";
import SvgInline from '../utils/SvgInline.js';
import { useLocation } from 'react-router-dom';

function MyVerticallyCenteredModal(params) {
    // const props= params;
    const [mwidth, setWidth] = useState(250);
  
    const [mheight, setHeight] = useState(250);
  
    const [fullscreen, setFullscreen] = useState(true);
  
    const location = useLocation();
    const props = location.state;
    console.log(props);  

    function size(img) {
      setWidth(document.getElementById(img).clientWidth);
      setHeight(document.getElementById(img).clientHeight);
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
        await v.render();
        const blob = await canvas.convertToBlob();
        const pngUrl = URL.createObjectURL(blob);
        return pngUrl;
      }
  
      toPng({
        width: w,
        height: h,
      }).then((pngUrl) => {
        saveas(pngUrl);
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
  
          <Row>
  
          <Col style={{ overflow: "auto"}} className="popup_img">
  
                <SvgInline {...props}/>
  
  
  
  
  
  
  
  
  
            </Col>
  
            <div className="vr" style={{height: "75vh"}}/>
  
            <Col>
              <Accordion flush>
                <Accordion.Item eventKey="0" size="sm" >
                  <Accordion.Header
                    onClick={() => {
                      size(props.url);
                    }}
                  >
                    Adjust Size
                  </Accordion.Header>
                  <Accordion.Body >
                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        Width
                      </InputGroup.Text>
                      <Form.Control
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={(e) => setWidth(e.target.value)}
                        // placeholder={mwidth}
                        value={mwidth}
                      />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        Height
                      </InputGroup.Text>
                      <Form.Control
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={(e) => setHeight(e.target.value)}
                        // placeholder={mheight}
                        value={mheight}
                        // name={document.getElementById(brand.url).clientHeight}
                      />
                    </InputGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  DownloadToPng(props.url, mwidth, mheight);
                }}
              >
                Download PNG
              </Button>{" "}
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => saveas(props.url)}
                // onClick={() => saveas(props.title)}
              >
                Download SVG
              </Button>{" "}
            </Col>
          </Row>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button onClick={props.onHide}>Close</Button>
    //     </Modal.Footer>
    //   </Modal>
    );
  }

  export default MyVerticallyCenteredModal;