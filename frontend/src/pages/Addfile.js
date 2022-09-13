
import React, { useState } from "react";
import { createBrandAPI } from "../api";
import { UserAuth } from "../context/AuthContext";
// import { uploadSingleFileAndGetURL ,getS3SignUrl ,pushProfilePhotoToS3} from "../utils/fileUpload";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import {getS3SignUrl} from "../api/index.js"
function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          successfully Uploaded
          </Modal.Title>
        </Modal.Header>

      </Modal>
    );
  }












const Addfile = () => {
  const { user } = UserAuth();
  const [modalShow, setModalShow] = React.useState(false);
  const [file, setFile] = useState([]);
  const [title, setTitle] = useState();

  const onSubmitClick = async () => {
    // console.log("IN onSubmitClick");
    // console.log(file)
    // const fileUrl = await uploadSingleFileAndGetURL(file);
    try {
      const data = await getS3SignUrl(file);
      // console.log(data);
      setModalShow(+true);
      const imageUrl = data.split('?')[0];

      const a = createBrandAPI({
        url: imageUrl,
        title,
        description: "Description",
        email: user?.email,
      });
      // console.log(a)
    } catch (error) {
      // console.log("cha")
      // console.log(error)
    }
  };
  return (
    <React.Fragment>

<Card style={{ width: '30rem' }} className="text-center m-auto">

<Card.Body>
  <Card.Header>File to Upload</Card.Header>
  <br/>
  {/* <Card.Text> */}
  <Stack gap={3}>
  <InputGroup>
    <InputGroup.Text id="btnGroupAddon">Title</InputGroup.Text>
    <Form.Control
      type="text"
      placeholder="Input group example"
      aria-label="Input group example"
      aria-describedby="btnGroupAddon"
      onChange={(e) => setTitle(e.target.value)}
    />
     </InputGroup>
     <Form.Group controlId="formFileSm" className="mb-3">
  <Form.Control type="file" size="m"
  onChange={(e) => {
      debugger;
      setFile(e.target.files[0]);}}
      accept=".svg"
   />
</Form.Group>
</Stack>
  {/* </Card.Text> */}
  <Button variant="primary" onClick={onSubmitClick}>Submit</Button>
</Card.Body>

</Card>
<MyVerticallyCenteredModal
show={modalShow}
onHide={() => setModalShow(false)}
/>

    </React.Fragment>
  );
};

export default Addfile;

