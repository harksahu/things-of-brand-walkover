import React, { useState, useEffect } from "react";
import { createBrandAPI } from "../api/index.js";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { MdArrowBackIos, MdContentCopy } from "react-icons/md";
import Home from "./Home";
import {
  Card,
  Form,
  Button,
  Modal,
  Stack,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import {
  getS3SignUrl,
  getProfileDetails,
  updateProfileFields,
} from "../api/index.js";
import { BsX, BsInfoCircle } from "react-icons/bs";
import SideBar from "../components/SideBar";
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
  const [title, setTitle] = useState("");
  const [tags, setTags] = React.useState([]);
  const [domain, setDomain] = useState();
  const [id, setId] = useState();
  const [domainToSelect, setDomainToSelect] = useState("");
  const [ffresult, setResult] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location?.state?.domain);
  const [shareEmailDomainOption, setShareEmailDomainOption] = useState("");
  // console.log(location.state.domain);  
  // const [logo, setLogo] = useState();

  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      // props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  const findSharedEmail = async (req, res) => {
    var shareddEmail = await getProfileDetails({});
    for (var i = 0; i < shareddEmail?.data?.data?.length; i++) {
      for (var j = 0; j < shareddEmail?.data?.data[i]?.sharedEmail.length; j++) {
        if (shareddEmail?.data?.data[i]?.sharedEmail[j] == user.email) {
          // console.log("entered in loop");
          // console.log("user.email",user.email);
          // console.log(shareddEmail?.data?.data[i]);
          setShareEmailDomainOption(shareddEmail?.data?.data[i]?.domain);
        }
      }
    }
    profileDetails();
    
  };
  const removeTags = (index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };

  const profileDetails = async (req, res) => {
    let fresult = "";
    if (user.email) {
       
      fresult = await getProfileDetails({ email: user.email });
      setResult(fresult.data.data);
    }
    if (location?.state?.domain) {
      setDomain(location?.state?.domain);

    }
    else {

      //   setShareEmailDomainOption(temp);
      // }
    }
    if (location?.state?.domain) {
      setDomain(location?.state?.domain);
    } else {
      setDomain(fresult?.data?.data[0]?.domain);
    }

    setId(fresult?.data?.data[0]?._id);
  };

  const onSubmitClick = async () => {
    if (domain) {
      if (title) {
        if (file) {
          try {
            const data = await getS3SignUrl(file);

            setModalShow(+true);
            const imageUrl = data.split("?")[0];
            tags.push(domain);

            const result = await getProfileDetails({
              email: user.email,
              domain: domain,
            });
            console.log("result", result);
            const a = await createBrandAPI({
              url: imageUrl,
              title,
              description: tags,
              email: user?.email,
              domain: result.data.data[0]._id,
            });
            console.log("a");
            console.log(a);
            var logo;
            var i;
            for (i = 0; i < ffresult.length; i++) {
              if (domain === ffresult[i]._id) {
                logo = ffresult[i]?.logo;

                break;
              }
            }
            console.log("logo" + logo);
            // console.log("logo" + final_result);
            // console.log("logo="+imageUrl);

            if (logo == "null" || logo == undefined) {
              const data = {
                _id : result.data.data[0]._id,
                name: result.data.data[0]?.name,
                aboutus: result.data.data[0]?.aboutus,
                logo: imageUrl,
                links: result.data.data[0]?.links,
                domain: result.data.data[0]?.domain,
                guidlines: result.data.data[0]?.guidlines,
                color: result.data.data[0]?.allColor,
                email: result.data.data[0]?.email,
                verify: result.data.data[0]?.verify,
              };
              console.log("loogo="+imageUrl);

              await updateProfileFields(data);

            }
          } catch (error) { }
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
    findSharedEmail(); 
    if (user) {
      
      
      setDomainToSelect(location?.state?.domain);
    }
  }, [user,shareEmailDomainOption]);
  return (
    <>
      {user ?
        <Container className="wrpr">
          <Row>
            <nav className="navbar bg-light">
              <div className="container-fluid">
                <a
                  className="navbar-brand"
                >
                  <Button
                    variant="outline-dark"
                    className="me-3"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <MdArrowBackIos />
                  </Button>
                  Add a file to <strong>{location?.state?.domain}</strong>
                </a>
              </div>
            </nav>
            <Col md={9} lg={10} className="mt-4">
              <Card style={{ width: "30rem" }}>
                <Card.Body>
                  <Stack gap={3}>
                    <FormGroup>
                      <Form.Label>Choose a domain *</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setDomain(e.target.value);
                          { console.log("domain seted" + e.target.value) }
                        }}
                      >

                        {ffresult &&
                          ffresult.map((domainName, index) => (
                            <>

                              {domainToSelect == domainName.domain ?
                                <option key={index} value={domainName.domain} selected>
                                  {domainName.domain}
                                </option> : <option key={index} value={domainName.domain} >
                                  {domainName.domain}
                                </option>
                              }

                            </>
                          ))}
                        {shareEmailDomainOption ? <option value={shareEmailDomainOption} selected>
                          {shareEmailDomainOption}
                        </option> : ""}


                      </Form.Select>
                    </FormGroup>

                    <FormGroup>
                      <Form.Label>
                        Select SVG file * <small>(Logo, Icon etc)</small>{" "}
                        <a
                          href="https://en.wikipedia.org/wiki/Scalable_Vector_Graphics"
                          target="_new"
                        >
                          <BsInfoCircle />
                        </a>
                      </Form.Label>
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

                    <FormGroup>
                      <Form.Label>Give a name to file *</Form.Label>
                      <Form.Control
                        type="text"
                        aria-describedby="btnGroupAddon"
                        // onChange={(e) => setTitle(e.target.value)}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Form.Label>Add tags(Optional)</Form.Label>
                      <Form.Control
                        type="text"
                        onKeyUp={(event) => addTags(event)}
                      />
                      <Form.Text className="text-muted">
                        Press enter
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
        </Container> : <Home />
      }
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Addfile;
