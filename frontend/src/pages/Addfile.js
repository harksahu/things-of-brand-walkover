import React, { useState, useEffect } from "react";
import { createBrandAPI } from "../api";
import { UserAuth } from "../context/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import Modal from "react-bootstrap/Modal";
import { getS3SignUrl, getProfileDetails } from "../api/index.js";
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
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [tags, setTags] = React.useState([]);
  const [domain, setDomain] = useState();
  const [id, setId] = useState();
  const [ffresult, setResult] = useState();

  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      // props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  const removeTags = (index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };

  const profileDetails = async (req, res) => {
    // console.warn(params)
    // console.log("first");
    let fresult = "";
    if (user.email) {
      fresult = await getProfileDetails({ email: user.email });
      setResult(fresult.data.data);
    }
    setDomain(fresult?.data?.data[0]?.domain);
    setId(fresult?.data?.data[0]?._id);

    console.log(user);
    // console.log(fresult.data.data);
  };

  const onSubmitClick = async () => {
    // console.log("IN onSubmitClick");
    // console.log(file)
    // const fileUrl = await uploadSingleFileAndGetURL(file);
    if (domain) {
      if (title) {
        if (file) {
          try {
            const data = await getS3SignUrl(file);
            // console.log(data);
            setModalShow(+true);
            const imageUrl = data.split("?")[0];
            tags.push(domain);
            console.log(tags);
            const result = await getProfileDetails({ email: user.email });
            // console.log(result);
            const a = createBrandAPI({
              url: imageUrl,
              title,
              description: tags,
              // description: "description",
              email: user?.email,
              domain: domain,
            });
            console.log(a);
          } catch (error) {
            // console.log("cha")
            // console.log(error)
          }
        } else {
          alert("Image imput required");
        }
      } else {
        alert("title is required");
      }
    } else {
      alert("Complete your profile page");
    }
  };

  useEffect(() => {
    if (user) {
      profileDetails();
    }
  }, [user]);
  return (
    <React.Fragment>
      <Card style={{ width: "30rem" }} className="text-center m-auto">
        <Card.Body>
          <Card.Header>
            <h5>Choose the domain first</h5>
            <select
              onChange={(e) => {
                setDomain(e.target.value);
              }}
            >
              {ffresult &&
                ffresult.map((domainName, index) => (
                  <option value={domainName._id} key={index}>
                    {domainName.domain}
                  </option>
                ))}
            </select>
          </Card.Header>
          <br />
          {/* <Card.Text> */}
          <Stack gap={3}>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Control
                type="file"
                size="m"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setTitle(e.target.files[0].name.replace(".svg", ""));
                }}
                accept=".svg"
              />
            </Form.Group>
            <InputGroup>
              <InputGroup.Text id="btnGroupAddon">Title</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Input group example"
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
                // onChange={(e) => setTitle(e.target.value)}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </InputGroup>
            <div className="tags-input">
              <ul>
                {tags.map((tag, index) => (
                  <li key={index}>
                    <span>{tag}</span>
                    <i
                      className="material-icons"
                      onClick={() => removeTags(index)}
                    >
                      <CloseIcon />
                    </i>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                onKeyUp={(event) => addTags(event)}
                placeholder="Press enter to add tags"
              />
            </div>
          </Stack>
          {/* </Card.Text> */}
          <Button variant="primary" onClick={onSubmitClick}>
            Submit
          </Button>
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
