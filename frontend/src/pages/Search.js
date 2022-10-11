import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
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
import "../utils/svginline.css"
import MyVerticallyCenteredModal from "./Popup";

import { connect } from "react-redux";

import { searchBrand } from "../store/actions/search-brands";

import Figure from 'react-bootstrap/Figure';

import SvgInline from '../utils/SvgInline.js';

// function MyVerticallyCenteredModal(props) {

//   const [mwidth, setWidth] = useState(250);

//   const [mheight, setHeight] = useState(250);

//   const [fullscreen, setFullscreen] = useState(true);


//   function size(img) {
//     setWidth(document.getElementById(img).clientWidth);
//     setHeight(document.getElementById(img).clientHeight);
//   }

//   const DownloadToPng = async (img, w, h) => {
//     if (w === undefined) {
//       const x = document.getElementById(img).clientWidth;
//       setWidth(x);
//       w = x;
//     }
//     if (h === undefined) {
//       const y = document.getElementById(img).clientHeight;
//       setHeight(y);
//       h = y;
//     }

//     const preset = presets.offscreen();

//     async function toPng(data) {
//       const { width, height } = data;
//       // console.log(width);
//       const canvas = new OffscreenCanvas(width, height);
//       const ctx = canvas.getContext("2d");
//       const v = await Canvg.from(ctx, img, preset);
//       v.resize(width, height, "xMidYMid meet");
//       await v.render();
//       const blob = await canvas.convertToBlob();
//       const pngUrl = URL.createObjectURL(blob);
//       return pngUrl;
//     }

//     toPng({
//       width: w,
//       height: h,
//     }).then((pngUrl) => {
//       saveas(pngUrl);
//     });
//   };

//   return (
//     <Modal fullscreen={fullscreen}
//       {...props}
//       fullscreen = {true}
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           {props.user.title}
//         </Modal.Title>

//       </Modal.Header>

//       <Modal.Body>

//         <Row>

//         <Col style={{ overflow: "auto"}} className="popup_img">

//               <SvgInline {...props.user}/>









//           </Col>

//           <div className="vr" style={{height: "75vh"}}/>

//           <Col>
//             <Accordion flush>
//               <Accordion.Item eventKey="0" size="sm" >
//                 <Accordion.Header
//                   onClick={() => {
//                     size(props.user.url);
//                   }}
//                 >
//                   Adjust Size
//                 </Accordion.Header>
//                 <Accordion.Body >
//                   <InputGroup size="sm" className="mb-3">
//                     <InputGroup.Text id="inputGroup-sizing-sm">
//                       Width
//                     </InputGroup.Text>
//                     <Form.Control
//                       aria-label="Small"
//                       aria-describedby="inputGroup-sizing-sm"
//                       onChange={(e) => setWidth(e.target.value)}
//                       // placeholder={mwidth}
//                       value={mwidth}
//                     />
//                   </InputGroup>
//                   <InputGroup size="sm" className="mb-3">
//                     <InputGroup.Text id="inputGroup-sizing-sm">
//                       Height
//                     </InputGroup.Text>
//                     <Form.Control
//                       aria-label="Small"
//                       aria-describedby="inputGroup-sizing-sm"
//                       onChange={(e) => setHeight(e.target.value)}
//                       // placeholder={mheight}
//                       value={mheight}
//                       // name={document.getElementById(brand.url).clientHeight}
//                     />
//                   </InputGroup>
//                 </Accordion.Body>
//               </Accordion.Item>
//             </Accordion>
//             <Button
//               variant="outline-primary"
//               size="sm"
//               onClick={() => {
//                 DownloadToPng(props.user.url, mwidth, mheight);
//               }}
//             >
//               Download PNG
//             </Button>{" "}
//             <Button
//               variant="outline-secondary"
//               size="sm"
//               onClick={() => saveas(props.user.url)}
//               // onClick={() => saveas(props.user.title)}
//             >
//               Download SVG
//             </Button>{" "}
//           </Col>
//         </Row>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }


function Not_found(){
  return(


<Figure
className="text-center flex justify-cont"
>
<Figure.Image
  width={500}
  height={500}
  alt="171x180"
  src="https://i.pinimg.com/564x/f4/e0/d9/f4e0d998d00d96269eeb30c8c625031b.jpg"

/>
<Figure.Caption>
Data not found
</Figure.Caption>
</Figure>
  )
}




function Home({ searchBrandData=[], getSearchBrand }) {
  // console.log(searchBrandData)
  const [modalShow, setModalShow] = React.useState(false);
  const [open, opendata] = useState([]);


  useEffect(() => {
    getSearchBrand({});
  }, []);
  return (
    <div className="p-3 flex bg-light">
      <div className="d-flex flex-wrap justify-content-center">
        { searchBrandData?.data?.length ===0?<Not_found/>: searchBrandData?.data?.map((brand) => {
          // console.log(brand);
          return (
            <div key= { brand._id} className="d-flex justify-content-center item">
             
             
             <Link to = "/popup" state={brand}>
              <Card                
                onClick={() => {
                  opendata(brand);

                }}

              >

                <div  style={{ overflow: "auto" }} className="img_size">

                <SvgInline {...brand}/>

                </div>







                <Card.Body>

                  <Card.Title style={{ textDecoration: 'none' }} className="text-center">{brand.title}</Card.Title>
                  <Card.Text></Card.Text>
                </Card.Body>                
              </Card>
              </Link>
            </div>
          );
        })}
        {/* ))} */}
      </div>
    </div>
  );
}

const mapStateToProp = (state, ownProps) => {
  return { ...ownProps, searchBrandData: state.searchBrandReducer };
};

const mapDispatchToProp = (dispatch) => {
  return {
    getSearchBrand: (payload) => dispatch(searchBrand(payload)),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Home);

// export default Home