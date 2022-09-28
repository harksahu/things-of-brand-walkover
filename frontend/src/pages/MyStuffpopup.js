import react from "react";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import saveas from "file-saver";
import { Canvg, presets } from "canvg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../utils/svginline.css";
import SvgInline from "../utils/SvgInline.js";
import { useLocation , useNavigate } from "react-router-dom";
import {
  sendMyStuffAPI,
  deleteMyStuffAPI,
  sendMydeleteStuffAPI,
  restoreMyStuffAPI,
  saveMyStuffAPI,
} from "../api";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function MyStuffPopup(params) {
  // const props= params;
  const [mwidth, setWidth] = useState(250);

  const [mheight, setHeight] = useState(250);

  const [name, setName] = useState("");

  const [fullscreen, setFullscreen] = useState(true);

  const location = useLocation();
  const props = location.state;
  const navigate = useNavigate();
  console.log(props);


   function changeHW(){
      document.getElementById(props.url).style.width = mwidth + "px";
      document.getElementById(props.url).style.height = mheight + "px";
  
   }
  function size(img) {
    setWidth(document.getElementById(img).clientWidth);
    setHeight(document.getElementById(img).clientHeight);
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
  function Set_Name() {
    console.log("object");
    console.log(name);
    if (name === "") {
      setName(props.title);
    }
  }
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>
            <input
              type="text"
              placeholder={props.title}
              onClick={() => {
                console.log("object");
                Set_Name();
              }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            ></input>
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
              variant="success"
            >
              save
            </Button>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Row>
        <Col style={{ overflow: "auto" }} className="popup_img">
          <SvgInline {...props} />
        </Col>

        <div className="vr" style={{ height: "75vh" }} />

        <Col>
          <Accordion flush>
            <Accordion.Item eventKey="0" size="sm">
              <Accordion.Header
                onClick={() => {
                  size(props.url);
                }}
              >
                Adjust Size
              </Accordion.Header>
              <Accordion.Body>
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
            onClick={() => DownloadToSvg(props.url,props.title)}
            // onClick={() => saveas(props.title)}
          >
            Download SVG
          </Button>{" "}
          <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => changeHW()}
              >
                Show
              </Button>{" "}
          <br />
          <br />
          <br />
        </Col>

        {props.active === false ? (
          <Button
            onClick={async () => {
              console.log("object")
              await restoreMyStuffAPI(props?._id);
              // alert("restore")
              navigate(-1)
            }}
            variant="info"
          >
            Restore
          </Button>
        ) : (
          <Button
            onClick={async () => {
              await deleteMyStuffAPI(props?._id);
              // alert("Deleted");
              // window.location.reload();
              navigate(-1)
            }}
            variant="danger"
          >
            delete
          </Button>
        )}
      </Row>
    </>
  );
}

export default MyStuffPopup;
