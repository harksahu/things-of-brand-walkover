import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { sendBrandAPI } from "../api";

function Home() {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const[ listOfbrands , setListOfBrands] = useState([])
  console.log(width)
  const printIt=async()=>{
    setListOfBrands((await sendBrandAPI())?.data?.data)
  }
  useEffect(() => {
    printIt()
  },[]);
  return (
    <div className=" m-3 flex">
{listOfbrands.map(brand=>{
  console.log(brand);
  return (<Card style={{ width: "18rem" }} className="m-3">
        <Card.Img
          variant="top"
          src={brand.Url}
        />
        <Card.Body>
          <Card.Title className="text-center">{brand.Title}</Card.Title>
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
                      onChange={(e) => setWidth({ ...width, image: e.target.value })}
                    />
                  </InputGroup>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm" >
                      Height
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) => setHeight({ ...height, image: e.target.value })}
                    />
                  </InputGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Button variant="outline-primary" size="sm">
            Download PNG
          </Button>{" "}
          <Button variant="outline-secondary" size="sm">
            Download SVG
          </Button>{" "}
        </Card.Body>
      </Card>)
})}

     
    </div>
  );
}

export default Home;
