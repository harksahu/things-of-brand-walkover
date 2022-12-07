import React, { useState, useEffect } from "react";
import { createBrandAPI } from "../api";
import { UserAuth } from "../context/AuthContext";
import { Card, Form, Button, Modal, Stack, Container, Col, Row } from "react-bootstrap";
import { getS3SignUrl, getProfileDetails,updateProfileFields} from "../api/index.js";
import { BsX, BsInfoCircle } from "react-icons/bs";
import SideBar from '../components/SideBar';
import "../scss/style.scss";
import "../scss/addfile.scss";
import { FormGroup } from "@mui/material";
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
  // const [logo, setLogo] = useState();

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
    // setLogo(fresult?.data?.data[0]?.logo);
    setId(fresult?.data?.data[0]?._id);

    // console.log("id in console", id);
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
            const result = await getProfileDetails({ email: user.email, domain:domain});
            console.log("id finding:",result);
            const a = await createBrandAPI({
              url: imageUrl,
              title,
              description: tags,
              // description: "description",
              email: user?.email,
              domain: result.data.data[0]._id,
            });
            console.log(a);
            console.log(result.data.data[0]._id);
            var logo ;
            var i ;
            for ( i = 0; i < ffresult.length; i++) {
              if(domain === ffresult[i]._id){
                console.log(ffresult[i].domain);
                console.log(ffresult[i]?.logo);
                logo = ffresult[i]?.logo;
                break
              }
             
              
            }

            console.log(ffresult[i]);
            console.log("logo =" + imageUrl );
            console.log(logo== "null" );

            if(logo == "null"){


              const data = {
                name: ffresult[i].name,
                aboutus: ffresult[i].aboutus,
                logo: imageUrl,
                links: ffresult[i].links,
                domain:ffresult[i].domain,
                guidlines: ffresult[i].guidlines,
                // fontSize: fontSize,
                // PrimaryColors: PrimaryColors,
                // secondaryColors: secondaryColors,
                // backgroundColors: backgroundColors,
                color:ffresult[i].allColor,
                email: ffresult[i].email,
                verify: ffresult[i].verify,
              };
              // console.log("data in updatelogo", data);
              await updateProfileFields(data);
            }










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
    <>
      <Container fluid className="wrpr">
        <Row>
          <Col md={3} lg={2}>
            <SideBar />
          </Col>
          <Col md={9} lg={10}>
            <Card style={{ width: "30rem" }}>
              <Card.Body>
                <Stack gap={3}>
                  <FormGroup >
                    <Form.Label>Choose a domain *</Form.Label>
                    <Form.Select aria-label="Default select example"
                      onChange={(e) => {
                        setDomain(e.target.value);
                        {console.log("domain in e target:"+e.target.value)}
                      }}
                     
                    >
                       {console.log("domain:"+domain)}
                     
                      {ffresult &&
                        ffresult.map((domainName, index) => (
                          <option value={domainName.domain} key={index}>
                            {domainName.domain}
                          </option>
                        ))}
                    </Form.Select>
                  </FormGroup>

                  <FormGroup>
                    <Form.Label>Select SVG file * <small>(Logo, Icon etc)</small> <a href="https://en.wikipedia.org/wiki/Scalable_Vector_Graphics" target="_new"><BsInfoCircle /></a></Form.Label>
                    <Form.Control
                      type="file"
                      size="m"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setTitle(e.target.files[0].name.replace(".svg", ""));
                      }}
                      accept=".svg"
                    />
                  </FormGroup>

                  <FormGroup >
                    <Form.Label>Give a name to file *</Form.Label>
                    <Form.Control
                      type="text"
                      aria-describedby="btnGroupAddon"
                      // onChange={(e) => setTitle(e.target.value)}
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </FormGroup>

                  <FormGroup >
                    <Form.Label>Add tags(Optional)</Form.Label>
                    <Form.Control
                      type="text"
                      onKeyUp={(event) => addTags(event)}
                    />
                    <Form.Text className="text-muted">
                      Press enter to add tags
                    </Form.Text>
                    <ul className="tags my-3">
                      {tags.map((tag, index) => (
                        <li key={index} className="tag-item">
                          <span>{tag}</span>
                          <i
                            className="tag-icon"
                            onClick={() => removeTags(index)}
                          >
                            <BsX />
                          </i>
                        </li>
                      ))}
                    </ul>
                  </FormGroup>
                </Stack>
                {/* </Card.Text> */}
                <Button variant="primary" onClick={onSubmitClick}>
                  Submit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Addfile;
