import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { sendMyStuffAPI } from "../api";
import saveas from "file-saver";
import { Canvg } from 'canvg';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



function Home() {

  const { user } = UserAuth();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const[ listOfbrands , setListOfBrands] = useState([])
  const [dimensions,setdimensions] = useState([]);

  // console.log(width)
  const printIt=async()=>{
    setListOfBrands((await sendMyStuffAPI(user.email))?.data?.data)
  }
  let v = null;
function size(img){

  setWidth(  document.getElementById(img).clientWidth)
  setHeight(  document.getElementById(img).clientHeight)
}

  const DownloadToPng = async (img) => {
   const canvas = document.querySelector('canvas');
   const ctx = canvas.getContext('2d');
// const a ='<svg height="500" width="400">'+img+'</svg>';
   v = await Canvg.from(ctx,img);
   console.log(v)
   v.start();
   console.log("first")
   var img1 = canvas.toDataURL("img/png");


    saveas(img1); 

  }

  useEffect(() => {
    printIt()
  },[user]);
  return (
    <div className=" m-3 flex">
{listOfbrands.map(brand=>{
  console.log(brand);


  return (

    <Row md={4} className="g-4">
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
            <Accordion flush>
              <Accordion.Item eventKey="0" size="sm">
                <Accordion.Header onClick={()=>size(brand.url)}>Adjust Size</Accordion.Header>
                <Accordion.Body>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Width
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) => setWidth( e.target.value )}
                      placeholder={width}
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
                      placeholder={height}
                    />
                  </InputGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Button variant="outline-primary" size="sm"  onClick={() =>DownloadToPng(brand.url)}>
            Download PNG
          </Button>{" "}
          <Button variant="outline-secondary" size="sm" onClick={()=>
          saveas(brand.url)}>
            Download SVG
          </Button>{" "}
        </Card.Body>
      </Card>
      </Col>
      </Row>
      )
})}

     
    </div>
  );
}

export default Home;
