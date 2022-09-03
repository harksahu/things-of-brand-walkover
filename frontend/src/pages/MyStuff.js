import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { sendMyStuffAPI,deleteMyStuffAPI,sendMydeleteStuffAPI,restoreMyStuffAPI,saveMyStuffAPI} from "../api";
import saveas from "file-saver";
import { Canvg,presets } from 'canvg';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
  const [mwidth, setWidth] = useState();
  const [mheight, setHeight] = useState();
  const [name, setName] = useState();

  function size(img){

    setWidth(  document.getElementById(img).clientWidth)
    setHeight(  document.getElementById(img).clientHeight)
  }


const DownloadToPng = async (img,w,h) => {
  if(w===undefined){
    const x = document.getElementById(img).clientWidth
    setWidth(x)
    w=x
  }
  if(h===undefined){
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control

                placeholder={props.user.title}

                onChange={(e) => setName( e.target.value )}
              />
            </Form.Group>
        </Form>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
        <Col>

      <Card.Img
          variant="top"
          src={props.user.url}
          id={props.user.url}
        />
          </Col>
          <div className="vr" />
          <Col>


      <Accordion flush onClick={()=>{
              size(props.user.url)
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
            <Button variant="outline-primary" size="sm" 
          onClick={() =>{DownloadToPng(props.user.url,mwidth,mheight)}}>
            Download PNG
          </Button>{" "}
          <Button variant="outline-secondary" size="sm" onClick={()=>
          saveas(props.user.url)}>
            Download SVG
          </Button>{" "}
          </Col>
          </Row>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={async()=>{
    await saveMyStuffAPI(props.user
      , name)
    alert("saved")
    
  }}  variant="success" disabled>save</Button>
        <Button onClick={async()=>{
    await deleteMyStuffAPI(props.user._id)
    alert("Deleted")
  }} variant="danger">delete</Button>

        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function MydeletedStuff(props) {
  const [mwidth, setWidth] = useState();
  const [mheight, setHeight] = useState();
  const [name, setName] = useState();

  function size(img){

    setWidth(  document.getElementById(img).clientWidth)
    setHeight(  document.getElementById(img).clientHeight)
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control

                placeholder={props.user.title}
                
                onChange={(e) => setName( e.target.value )}
              />
            </Form.Group>
        </Form>

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
        <Col>

      <Card.Img
          variant="top"
          src={props.user.url}
          id={props.user.url}
        />
          </Col>
          <div className="vr" />
          <Col>


      <Accordion flush onClick={()=>{
              size(props.user.url)
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
            <Button variant="outline-primary" size="sm" 
          onClick={() =>{DownloadToPng(props.user.url,mwidth,mheight)}}>
            Download PNG
          </Button>{" "}
          <Button variant="outline-secondary" size="sm" onClick={()=>
          saveas(props.user.url)}>
            Download SVG
          </Button>{" "}
          </Col>
          </Row>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={async()=>{
    await saveMyStuffAPI(props.user
      , name)
    alert("saved")
    
  }}  variant="success" disabled>save</Button>
        <Button onClick={async()=>{
    await restoreMyStuffAPI(props.user._id)
    alert("Restore")
  }} variant="info">Restore</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


function Home() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const { user } = UserAuth();
  const[ listOfbrands , setListOfBrands] = useState([])
  const[ listOfdeletedbrands , setListOfdeletedbrands] = useState([])
  const[ open , opendata] = useState([])



  // console.log(width)
  const printIt=async()=>{
    setListOfBrands((await sendMyStuffAPI(user.email))?.data?.data)
    setListOfdeletedbrands((await sendMydeleteStuffAPI(user.email))?.data?.data)
  }
  useEffect(() => {
    printIt()
  },[user]);
  return (
    <>
    <div className=" m-3 flex">
    <h1 className="text-center">Public Items</h1>

      <Row md={4} className="g-4">
      {/* {Array.from({ length: listOfbrands.length }).map((_, idx) => ( */}
{listOfbrands.map(brand=>{
  // console.log(brand);
  return (
    <Col>
    
    
    <Card style={{ width: "18rem" }} className="m-3" onClick={() => {setModalShow(true);opendata(brand)}}>
        <Card.Img
          variant="top"
          src={brand.url}

        />
        <Card.Body>
          <Card.Title className="text-center">{brand.title}</Card.Title>
          <Card.Text>

          </Card.Text>
        </Card.Body>
        <Card.Body>
          
        </Card.Body>
      </Card>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user = {open}
      />
</Col>
      )
})}
            {/* ))} */}

      </Row>
     
    </div>



<hr/>


    <div className=" m-3 flex">
      <h1 className="text-center">Deleted Items</h1>
      <Row md={4} className="g-4">
      {/* {Array.from({ length: listOfbrands.length }).map((_, idx) => ( */}
{listOfdeletedbrands.map(brand=>{
  // console.log(brand);
  return (
    <Col>
    
    
    <Card style={{ width: "18rem" }} className="m-3" onClick={() => {setModalShow2(true);opendata(brand)}}>
        <Card.Img
          variant="top"
          src={brand.url}

        />
        <Card.Body>
          <Card.Title className="text-center">{brand.title}</Card.Title>
          <Card.Text>

          </Card.Text>
        </Card.Body>
        <Card.Body>
          
        </Card.Body>
      </Card>
      <MydeletedStuff
        show={modalShow2}
        onHide={() => setModalShow2(false)}
        user = {brand}
      />
</Col>
      )
})}
            {/* ))} */}

      </Row>
     
    </div>


    </>
  );
}

export default Home;
