import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { sendBrandAPI } from "../api";
import saveas from "file-saver";
import { Canvg } from 'canvg';


function Home() {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const[ listOfbrands , setListOfBrands] = useState([])
  // console.log(width)


  function size(img){

    setWidth(  document.getElementById(img).clientWidth)
    setHeight(  document.getElementById(img).clientHeight)
  }

  const printIt=async()=>{
    setListOfBrands((await sendBrandAPI())?.data?.data)
  }
  let v = null;
  const DownloadPng = async (img) => {
   const canvas = document.querySelector('canvas');
   const ctx = canvas.getContext('2d');

   v = await Canvg.from(ctx, img);
   v.start();

   var img1 = canvas.toDataURL("img/png");

    saveas(img1); 
  }
  useEffect(() => {
    printIt()
  },[]);
  return (
    <div className=" m-3 flex">
{listOfbrands.map(brand=>{
  console.log(brand);
  return (
  <Card style={{ width: "18rem" }} className="m-3">
        <Card.Img
          variant="top"
          src={brand.url}
        />
        <Card.Body>
          <Card.Title className="text-center">{brand.title}</Card.Title>
          <Card.Text>
            <Accordion flush>
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
          <Button variant="outline-primary" size="sm" 
          onClick={() =>DownloadPng(brand.url)}>
            Download PNG
          </Button>{" "}
          <Button variant="outline-secondary" size="sm" onClick={()=>
          saveas(brand.url)}>
            Download SVG
          </Button>{" "}
        </Card.Body>
      </Card>)
})}

     
    </div>
  );
}

export default Home;
