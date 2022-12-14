import React, { useState, useEffect } from "react";
import { createBrandAPI } from "../api/Index.js";
import { UserAuth } from "../context/AuthContext";
import Home from "./Home";
import {
  Card,
  Form,
  Button,
  Stack,
  Col,
  Row,
} from "react-bootstrap";
import AlertComponent from "../components/AlertComponent"
import {
  getS3SignUrl,
  getProfileDetails,
  updateProfileFields,
} from "../api/Index.js";
import { BsX, BsInfoCircle } from "react-icons/bs";
import "../scss/style.scss";
import "../scss/addfile.scss";
import { FormGroup } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader.js";
import InputComponent from "../components/InputComponent.js";

const Addfile = (props) => {
  const { user } = UserAuth();
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [tags, setTags] = React.useState([]);
  const [domain, setDomain] = useState();
  const [domainToSelect, setDomainToSelect] = useState("");
  const [ffresult, setResult] = useState();
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");


  const [shareEmailDomainOption, setShareEmailDomainOption] = useState("");


  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  const findSharedEmail = async () => {
    var shareddEmail = await getProfileDetails({});
    for (var i = 0; i < shareddEmail?.data?.data?.length; i++) {
      for (var j = 0; j < shareddEmail?.data?.data[i]?.sharedEmail.length; j++) {
        if (shareddEmail?.data?.data[i]?.sharedEmail[j] == user.email) {

          setShareEmailDomainOption(shareddEmail?.data?.data[i]?.domain);
        }
      }
    }
    profileDetails();
    setLoading(false);

  };
  const removeTags = (index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };

  const profileDetails = async () => {
    let fresult = "";
    if (user.email) {

      fresult = await getProfileDetails({ email: user.email });
      setResult(fresult.data.data);
    }
    if (props.domain) {
      setDomain(props.domain);

    }
    else {

      //   setShareEmailDomainOption(temp);
      // }
    }
    if (props.domain) {
      setDomain(props.domain);
    } else {
      setDomain(fresult?.data?.data[0]?.domain);
    }

  };

  const onSubmitClick = async () => {
    if (!domain) {

      setShowAlert(true);
      setMessage("Complete your profile page")
      return
    }

    if (!title) {
      setShowAlert(true);
      setMessage("File Name is required")
      return
    }
    if (!file) {
      setShowAlert(true);
      setMessage("Image imput required")
      return
    }
    try {
      const data = await getS3SignUrl(file);

      // setModalShow(+true);
      setShowAlert(true);
      setMessage("successfully Uploaded")
      const imageUrl = data.split("?")[0];
      tags.push(domain);

      const result = await getProfileDetails({
        email: user.email,
        domain: domain,
        searchfrom: "true"
      });

      await createBrandAPI({
        url: imageUrl,
        title,
        description: tags,
        collections: tags,
        email: user?.email,
        domain: result.data.data[0]._id,
      });


      if (result.data.data[0]?.logo == undefined) {
        const data = {
          _id: result.data.data[0]._id,
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


        await updateProfileFields(data);

      }
    } catch (error) {
      //TODO: error message
    }
    setTags([])

  };

  useEffect(() => {
    setLoading(true);
    findSharedEmail();
    // setLoading(false);
    if (user) {

      setDomainToSelect(props.domain);
    }
  }, [user, shareEmailDomainOption]);
  return (
    <>
      <AlertComponent message={message} showAlert={showAlert} setShowAlert={setShowAlert} />
      {loading ? <div className="center-loader"
      ><ClipLoader /></div> :
        <div>
          {user ?
            // <Container className="wrpr">
            <Row>

              <Col md={9} lg={10}>
                <Card style={{ width: "29rem", margin: "auto" }}>
                  <Card.Body>
                    <Stack gap={3}>
                      <FormGroup>
                        <Form.Label>Choose a domain *</Form.Label>
                        <Form.Control
                          aria-label="Default select example"
                          onChange={(e) => {
                            setDomain(e.target.value);
                            setDomainToSelect(e.target.value)
                          }}
                          as="select"
                          value={domainToSelect}
                        >

                          {ffresult &&
                            ffresult.map((domainName, index) => (
                              <option key={index} value={domainName.domain}>
                                {domainName.domain}
                              </option>
                            ))}
                          {shareEmailDomainOption ? <option value={shareEmailDomainOption} selected>
                            {shareEmailDomainOption}
                          </option> : ""}


                        </Form.Control>
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

                      <InputComponent label={"Give a name to file *"} setValue={setTitle} valuee={title} placeholderr={"Enter file name"} />

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
                    <Button variant="primary" onClick={onSubmitClick}>
                      Submit
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            //  </Container>
            : <Home />
          }
        </div>
      }

    </>
  );
};

export default Addfile;