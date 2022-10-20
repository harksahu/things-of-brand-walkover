import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import {
  sendMyStuffAPI,
  deleteMyStuffAPI,
  sendMydeleteStuffAPI,
  restoreMyStuffAPI,
  saveMyStuffAPI,
} from "../api";
import saveas from "file-saver";
import { Canvg, presets } from "canvg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import SvgInline from "../utils/SvgInline.js";
import "../utils/svginline.css";

import { connect } from "react-redux";

import { searchBrand } from "../store/actions/search-brands";

import Figure from "react-bootstrap/Figure";

// function MyVerticallyCenteredModal(props) {
//   const [mwidth, setWidth] = useState();
//   const [mheight, setHeight] = useState();
//   const [name, setName] = useState();

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
//       // console.log(width)
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
//       saveas(pngUrl,props.user.title);
//     });
//   };

//   return (
//     <Modal
//       {...props}
//       fullscreen={true}
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           <Form>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Control
//                 placeholder={props.user.title}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Row>
//           <Col className="popup_img" style={{ overflow: "auto" }}>
//             <SvgInline {...props.user} />
//           </Col>
//           <div className="vr" />
//           <Col>
//             <Accordion
//               flush
//               onClick={() => {
//                 size(props.user.url);
//               }}
//             >
//               <Accordion.Item eventKey="0" size="sm">
//                 <Accordion.Header>Adjust Size</Accordion.Header>
//                 <Accordion.Body>
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
//               onClick={() => saveas(props.user.url,props.user.title)}
//             >
//               Download SVG
//             </Button>{" "}
//           </Col>
//         </Row>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button
//           onClick={async () => {
//             const new_data = {
//               _id: props.user._id,
//               title: name,
//             };
//             await saveMyStuffAPI(new_data);
//             alert("saved");
//             window.location.reload();
//           }}
//           variant="success"
//         >
//           save
//         </Button>
//         <Button
//           onClick={async () => {
//             await deleteMyStuffAPI(props.user._id);
//             alert("Deleted");
//             window.location.reload();
//           }}
//           variant="danger"
//         >
//           delete
//         </Button>

//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
// function MydeletedStuff(props) {
//   const [mwidth, setWidth] = useState();
//   const [mheight, setHeight] = useState();
//   const [name, setName] = useState();

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
//       // console.log(width)
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
//       saveas(pngUrl,props.user.title);
//     });
//   };

//   return (
//     <Modal

//       {...props}
//       fullscreen={true}
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           <Form>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Control
//                 placeholder={props.user.title}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Row>
//           <Col style={{ overflow: "auto" }} className="popup_img">
//             <SvgInline {...props.user} />
//           </Col>
//           <div className="vr" />
//           <Col>
//             <Accordion
//               flush
//               onClick={() => {
//                 size(props.user.url);
//               }}
//             >
//               <Accordion.Item eventKey="0" size="sm">
//                 <Accordion.Header>Adjust Size</Accordion.Header>
//                 <Accordion.Body>
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
//               onClick={() => saveas(props.user.url,props.user.title)}
//             >
//               Download SVG
//             </Button>{" "}
//           </Col>
//         </Row>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button
//           onClick={async () => {
//             const new_data = {
//               _id: props.user._id,
//               title: name,
//             };
//             // console.log(new_data)
//             await saveMyStuffAPI(new_data);
//             alert("saved");
//             window.location.reload();
//           }}
//           variant="success"
//         >
//           save
//         </Button>
//         <Button
//           onClick={async () => {
//             await restoreMyStuffAPI(props.user._id);
//             alert("Restore");
//             window.location.reload();
//           }}
//           variant="info"
//         >
//           Restore
//         </Button>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
// function Home() {

function Not_found() {
  return (
    <Figure className="text-center flex justify-cont">
      <Figure.Image
        width={500}
        height={500}
        alt="171x180"
        src="https://i.pinimg.com/564x/f4/e0/d9/f4e0d998d00d96269eeb30c8c625031b.jpg"
      />
      <Figure.Caption>Data not found</Figure.Caption>
    </Figure>
  );
}

function Home({ searchBrandData = [], getSearchBrand }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const { user } = UserAuth();
  const [listOfbrands, setListOfBrands] = useState([]);
  const [listOfdeletedbrands, setListOfdeletedbrands] = useState([]);
  const [open, opendata] = useState([]);

  // console.log(width)
  const printIt = async () => {
    setListOfBrands((await sendMyStuffAPI(user.email))?.data?.data);
    setListOfdeletedbrands(
      (await sendMydeleteStuffAPI(user.email))?.data?.data
    );
  };
  useEffect(() => {
    printIt();
    getSearchBrand({
      email: user.email,
      active: "",
    });
  }, [user]);

  return (
    <>
      <div className=" m-3 ">
        <h1 className="text-center">Public Items</h1>

        <Row md={4} className="g-4 flex p-3 bg-light">
          {/* {Array.from({ length: listOfbrands.length }).map((_, idx) => ( */}
          {/* {listOfbrands.map((brand) => { */}
          {searchBrandData?.data?.length === 0 ? (
            <Not_found />
          ) : (
            searchBrandData?.data?.map((brand) => {
              return (
                <Col
                  key={brand._id}
                  className="d-flex justify-content-center item "
                >
                  <Link to={"/popup/" + brand._id} state={brand}>
                    <Card
                      style={{ width: "18rem" }}
                      className="m-3"
                      onClick={() => {
                        setModalShow(+true);
                        opendata(brand);
                      }}
                    >
                      <div style={{ overflow: "auto" }}>
                        <SvgInline {...brand} />
                      </div>
                      <Card.Body>
                        <Card.Title className="text-center">
                          {brand.title}
                        </Card.Title>
                        <Card.Text></Card.Text>
                      </Card.Body>
                      <Card.Body></Card.Body>
                    </Card>
                  </Link>
                </Col>
              );
            })
          )}
          {/* ))} */}
        </Row>
      </div>

      <hr />

      <div className=" m-3 flex">
        <h1 className="text-center">Deleted Items</h1>
        <Row md={4} className="g-4">
          {/* {Array.from({ length: listOfbrands.length }).map((_, idx) => ( */}
          {listOfdeletedbrands.map((brand) => {
            // console.log(brand);
            return (
              <Col key={brand._id}>
                <Link to={"/popup/" + brand._id} state={brand}>
                  <Card
                    style={{ width: "18rem" }}
                    className="m-3"
                    onClick={() => {
                      setModalShow2(+true);
                      opendata(brand);
                    }}
                  >
                    <div style={{ overflow: "auto" }} className="img_size">
                      <SvgInline {...brand} />
                    </div>
                    <Card.Body>
                      <Card.Title className="text-center">
                        {brand.title}
                      </Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                    <Card.Body></Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
          {/* ))} */}
        </Row>
      </div>
    </>
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
