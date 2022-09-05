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
import Modal from 'react-bootstrap/Modal';

// const preset = presets.offscreen();
// async function toPng(data) {
//   const {
//     width,
//     height,
//     svg
//   } = data
//   const canvas = new OffscreenCanvas(width, height)
//   const ctx = canvas.getContext('2d')
//   const v = await Canvg.from(ctx, svg, preset)
//   v.resize(width, height, 'xMidYMid meet')
//   await v.render()
//   const blob = await canvas.convertToBlob()
//   const pngUrl = URL.createObjectURL(blob)
//   return pngUrl
// }

// toPng({
//   width: 600,
//   height: 600,
//   svg: './example.svg'
// }).then((pngUrl) => {
//   const img = document.querySelector('img')

//   img.src = pngUrl
// })

function MyVerticallyCenteredModal(props) {
  const [mwidth, setWidth] = useState();
  const [mheight, setHeight] = useState();
// setimag(props.user.url)

  function size(img){

    setWidth(  document.getElementById(img).clientWidth)
    setHeight(  document.getElementById(img).clientHeight)
    // setimag()
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
     { console.log(props)}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         {props.user.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
        <Col>

      <Card.Img
          variant="top"
          src={props.user.url}  //image 
          id={props.user.url}
          width={mwidth}
          height = {mheight}
        />
          </Col>
          <div className="vr" />
          <Col>


      <Accordion flush>
              <Accordion.Item eventKey="0" size="sm">
                <Accordion.Header onClick={()=>{
              size(props.user.url)
            }}>Adjust Size</Accordion.Header>
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
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}






function Home() {
  const [modalShow, setModalShow] = React.useState(false);

  const[ listOfbrands , setListOfBrands] = useState([])
  const[ open , setopen] = useState()



  const printIt=async()=>{
    setListOfBrands((await sendBrandAPI())?.data?.data)
  }
 
  useEffect(() => {
    printIt()
  },[]);
  return (
    <div className=" m-3 flex">
      <Row md={4} className="g-4">
{listOfbrands.map(brand=>{
  // console.log(brand);
  return (
    <Col>
    
    
    <Card style={{ width: "18rem" }} className="m-3" onClick={() => {setModalShow(true) ;setopen(brand)}}>
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
  );
}

export default Home;
