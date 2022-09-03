import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { sendBrandAPI } from "../api";
import saveas from "file-saver";
import { Canvg,presets } from 'canvg';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Home() {
  const [mwidth, setWidth] = useState();
  const [mheight, setHeight] = useState();
  const[ listOfbrands , setListOfBrands] = useState([])
  // console.log(width)
  function size(img){
    const x = document.getElementById(img).clientWidth
    setWidth(x)
    const y = document.getElementById(img).clientHeight
      setHeight(y)
  }


  const DownloadToPng = async (img,w,h) => {
    if(w==undefined){
      const x = document.getElementById(img).clientWidth
      setWidth(x)
      w=x
    }
    if(h==undefined){
      const y = document.getElementById(img).clientHeight
      setHeight(y)
      h=y
    }

    
    const preset = presets.offscreen()

    async function toPng(data) {
      const {
        width,
        height
      } = data
      console.log(width)
      const canvas = new OffscreenCanvas(width, height)
      const ctx = canvas.getContext('2d')
      const v = await Canvg.from(ctx, img, preset)
      v.resize(width, height, 'xMidYMid meet')
      await v.render()
      const blob = await canvas.convertToBlob()
      const pngUrl = URL.createObjectURL(blob)
      return pngUrl
    }
    
    toPng({
      width: w,
      height: h
    }).then((pngUrl) => {  
      saveas(pngUrl)
    })

  }
  return (
    <div className=" m-3 flex">
      <Row md={4} className="g-4">
{listOfbrands.map(brand=>{
  // console.log(brand);
  return (
    <Col>
    
  <Card style={{ width: "18rem" }} className="m-3">
        <Card.Img
          variant="top"
          src={brand.url}
          id={brand.url}
        />
        <Card.Body>
          <Card.Title className="text-center">{brand.title}</Card.Title>
          <Card.Text>
            <Accordion flush onClick={()=>{
              size(brand.url)
            }}>
              <Accordion.Item eventKey="0" size="sm">
                <Accordion.Header>Adjust Size</Accordion.Header>
                <Accordion.Body>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Width
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) => setWidth( e.target.value )}
                      // placeholder={mwidth}
                      value={mwidth}

                    />
                  </InputGroup>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm" >
                      Height
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) => setHeight( e.target.value )}
                      // placeholder={mheight}
                      value={mheight}
                      // name={document.getElementById(brand.url).clientHeight}


                    />
                  </InputGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Button variant="outline-primary" size="sm" 
          onClick={() =>{DownloadToPng(brand.url,mwidth,mheight)}}>
            Download PNG
          </Button>{" "}
          <Button variant="outline-secondary" size="sm" onClick={()=>
          saveas(brand.url)}>
            Download SVG
          </Button>{" "}
        </Card.Body>
      </Card>
      
</Col>
      )
})}
            {/* ))} */}
      </Row>
     
    </div>
  );
}

export default Home;
