import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import { UserAuth } from "../context/AuthContext";
import { getProfileDetails, updateProfileFields, getFontList, createProfile } from "../api/index.js";
import CloseIcon from "@mui/icons-material/Close";
import RichtextEditor from "./jodit.js";
import { BsFillTrashFill } from "react-icons/bs";
import { useLocation,Link, useNavigate } from "react-router-dom";
import SideBar from '../components/SideBar';
// import getFonts from "font-list"


function Profile(props) {
  const [name, setName] = useState("");
  const [aboutus, setAboutus] = useState("");
  const [domain, setDomain] = useState("");
  const [guidlines, setGuidlines] = useState("");
  const [fontSize, setFontSize] = useState([]);
  const [PrimaryColors, setPrimaryColors] = useState("");
  const [secondaryColors, setSecondaryColors] = useState("");
  const [backgroundColors, setBackgroundColors] = useState("");
  const { user } = UserAuth();
  const [links, setLinks] = React.useState([]);
  const [results, setResults] = useState("");
  const [company, setCompany] = useState("");
  const [profiledata, setProfile] = useState("");
  const [check, setCheck] = useState(true);
  const [id, setId] = useState("");
  const [logo, setLogo] = useState("null");
  const [verify, setVerify] = useState("false");
  const [color, setcount] = useState([{ colorName: "", colorValue: "#ffffff" }]);
  const [fontLink, setFontLink] = useState([""]);
  const [linkCount, setLinkCount] = useState(1);
  const [countTracker, setCountTracker] = useState(1);
  const [valid, setvalid] = useState([false]);
  const [valid2, setvalid2] = useState([false]);
  const [fontFamily, setFontFamily] = useState([false]);
  const location = useLocation();
  let countTemp = countTracker;
  let countTemp2 = linkCount
  var fresult
  const navigate = useNavigate();

  const addLinks = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setLinks([...links, event.target.value]);
      // props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  const removeLinks = (index) => {
    setLinks([...links.filter((link) => links.indexOf(link) !== index)]);
  };

  const fontlist = async () => {
    const data = await getFontList()
    console.log(data?.data?.items);
    setFontFamily(data)
  }

  useEffect(() => {
    // console.log(location?.state?.data)
    setId(location?.state?.data?._id);
    if (user) {
      if (user?.email) {
        next();
        profileDetails();

      }
    }
  }, [user]);

  useEffect(() => {
    fontlist()
  }, []);


  const storeProfileValue = async (req, res) => {
    if (check) {
      if (user) {
        if (user?.email) {
          try {
            // 
            const data = await createProfile({
              name,
              aboutus,
              links,
              domain,
              guidlines,
              fontLink,
              color,
              logo,
              verify,
              email: user?.email,
            });
            // console.log(data);
            alert("successfully saved domain " + domain);
          } catch (err) {
            console.log(err);
            alert("Profile is not created");
          }
        }
      }
    }
  };
  const updateProfileValue = async (req, res) => {


    if (name) {
      if (aboutus) {
        const data = {
          name: name,
          aboutus: aboutus,
          links: links,
          domain: domain,
          guidlines: guidlines,
          fontLink: fontLink,
          PrimaryColors: PrimaryColors,
          secondaryColors: secondaryColors,
          backgroundColors: backgroundColors,
          email: user?.email,
          color: color
        };
        await updateProfileFields(data);
        navigate(-1)
      } else {
        alert("about us field is compulsory")
      }

    } else {
      alert("name field is compulsory")


    }
  };

  const profileDetails = async (req, res) => {
    fresult = await getProfileDetails({});
    setResults(fresult.data.data);

    if (location.state?.data != null) {
      setName(location.state.data.name);
      setAboutus(location.state.data.aboutus);
      setLinks(location.state.data.links);
      setDomain(location.state.data.domain);
      setGuidlines(location.state.data.guidlines);
      setFontSize(location.state.data.fontSize);
      setPrimaryColors(location.state.data.PrimaryColors);
      setSecondaryColors(location.state.data.secondaryColors);
      setBackgroundColors(location.state.data.backgroundColors);
      setFontLink(location.state.data.fontLink);
      setcount(location.state.data.color);

    }

  };


  function extractDomain(url) {
    var domainName;
    if (url.indexOf("://") > -1) {
      domainName = url.split('/')[2];
    }
    else {
      domainName = url.split('/')[0];
    }

    //find & remove www
    if (domainName.indexOf("www.") > -1) {
      domainName = domainName.split('www.')[1];
    }

    domainName = domainName.split(':')[0];
    domainName = domainName.split('?')[0];

    return domainName;
  }

  const config = {
    buttons: ["bold", "italic"]
  };

  const next = () => {


    if (location.state?.data) {
      document.getElementById("name").classList.remove("visually-hidden")
      document.getElementById("about").classList.remove("visually-hidden")
      document.getElementById("socialLinks").classList.remove("visually-hidden")
      document.getElementById("Guidlines").classList.remove("visually-hidden")
      document.getElementById("list").classList.remove("visually-hidden")
      document.getElementById("fontLink").classList.remove("visually-hidden")
      document.getElementById("button").classList.remove("visually-hidden")
      document.getElementById("nxt").classList.add("visually-hidden")

    }
    else {
      var check = 2;
      for (let i = 0; i < results.length; i++) {
        // const e = results[i];
        if (results[i].domain === domain) {
          setCompany(results[i])
          check = 1;

          break;
        }
        else {
          // console.log("false");
          check = 0;

        }
      }

      if (check === 1) {
        console.log("old");
        document.getElementById("domainError").classList.remove("visually-hidden")
        
      }
      else if (check === 0) {
        var domainParts = domain.split(".");
        console.log(domainParts);
        console.log(domainParts.length);
        if (domain) {
          if (domainParts.length >= 2 && domainParts[1].length >= 1) {
            console.log("new");
            document.getElementById("name").classList.remove("visually-hidden")
            document.getElementById("about").classList.remove("visually-hidden")
            document.getElementById("socialLinks").classList.remove("visually-hidden")
            document.getElementById("Guidlines").classList.remove("visually-hidden")
            document.getElementById("list").classList.remove("visually-hidden")
            document.getElementById("fontLink").classList.remove("visually-hidden")
            document.getElementById("button").classList.remove("visually-hidden")
            document.getElementById("nxt").classList.add("visually-hidden")


            document.getElementById("domain").disabled = true;
            storeProfileValue()
          }
          else {

            alert("enter valid domain name");
          }
        }
        else {
          alert("enter domain name");
        }
      }
    }

  }

  const checkDomain = (datta) => {


    for (let i = 0; i < profiledata?.data?.data?.length; i++) {
      if (datta == profiledata?.data?.data[i].domain) {
        const domainId = document.getElementById("domain");
        domainId.innerHTML = "**this domain already resister**";
        setCheck(false);
      } else {
        const domainId = document.getElementById("domain");
        setCheck(true);
      }
    }



  };
  let addFormFields = () => {
    setcount([...color, { colorName: "", colorValue: "#000000" }]);
    setCountTracker(countTemp + 1);
    // console.log(countTracker);
  };
  let addFontFields = () => {
    setFontLink([...fontLink, ""]);
    setLinkCount(countTemp2 + 1);

  };
  let removeFontFields = (i) => {
    setLinkCount(countTemp2 - 1);
    document.getElementById("add_input").classList.remove("hide");
    let newFormValues = [...fontLink];
    newFormValues.splice(i, 1);
    setFontLink(newFormValues);
    let newFormVaild = [...valid2];
    newFormVaild.splice(i, 1);
    setvalid2(newFormVaild);

  };
  let removeFormFields = (i) => {
    setCountTracker(countTemp - 1);
    document.getElementById("add_input").classList.remove("hide");
    // console.log(countTracker);
    let newFormValues = [...color];
    newFormValues.splice(i, 1);
    setcount(newFormValues);
    let newFormVaild = [...valid];
    newFormVaild.splice(i, 1);
    setvalid(newFormVaild);

  };
  return (
    <>
      <Container fluid className="wrpr">
        <Row>

          <Col md={3} lg={2}>
            <SideBar />
          </Col>
          <Col md={9} lg={10}>
            <Button onClick={() => {
              navigate(-1)
            }} variant="dark">Back</Button>
            <Card style={{ width: "35rem" }}>
              <Card.Body>
                <Stack gap={3}>

                  <Form>
                    <Form.Group className="mb-3 visually-hidden" id="name">
                      <Form.Label>name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        aria-describedby="btnGroupAddon"
                        onChange={(e) => {
                          setName(e.target.value);
                          console.log(e.target.value);
                        }}
                        value={name}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 visually-hidden" id="about" >
                      <Form.Label>About us</Form.Label>
                      <RichtextEditor guidlines={aboutus} setGuidlines={setAboutus} config={config} tabIndex={1} />
                    </Form.Group>


                    <div className="tags-input mb-3 visually-hidden" id="socialLinks" style={{ margin: "auto" }}>
                      <h6>Social Links</h6>
                      <ul>
                        {links.map((link, index) => (
                          <li key={index}>
                            <span>{link}</span>
                            <i
                              className="material-icons"
                              onClick={() => removeLinks(index)}
                            >
                              <CloseIcon />
                            </i>
                          </li>
                        ))}
                      </ul>
                      <Form.Control
                        type="text"
                        onKeyUp={(event) => addLinks(event)}
                        placeholder="Press enter to add tags"
                      />
                    </div>
                    <Form.Group className="mb-3">
                      <Form.Label>Domain * <small>(example.com)</small></Form.Label>
                      <Form.Control
                        type="domain"
                        placeholder="Enter domain name"
                        list="doaminBrowsers"
                        name="myBrowser"
                        id="domain"
                        onChange={(e) => {

                          // setDomain(extractDomain(e.target.value));
                          setDomain(e.target.value);
                          checkDomain(e.target.value);
                        }}
                        value={domain}
                      />
                      <div className="visually-hidden" id="domainError">

                      This company is already created  <Link to="/domainVerify" state={{ data: company }}>Clam your brand</Link>

                      </div>

                      <datalist id="doaminBrowsers">
                        {results &&
                          results.map((brandData) => {
                            // console.log(brandData.domain);
                            return <option key={brandData._id} value={brandData.domain} />;
                          })}
                      </datalist>
                      {/* <div id="domain" style={{ color: "red" }}></div> */}
                    </Form.Group>

                    <Form.Group className="mb-3 visually-hidden" id="Guidlines" >
                      <Form.Label>Guidlines</Form.Label>
                      <RichtextEditor guidlines={guidlines} setGuidlines={setGuidlines} tabIndex={1} />
                    </Form.Group>

                    <div className="hide formbold-chatbox-form visually-hidden" id="list">
                      <Form.Group className="mb-3" >
                        <Form.Label>Color<small>(hex code in #123456 format)</small> </Form.Label>

                        {color.map((element, index) => (

                          <div id="fetch" key={index}>
                            <Form.Group className="mb-3 d-flex">

                              <Form.Control
                                type="text"
                                name="user_table_input"
                                id={index}
                                placeholder="Enter color name"
                                value={color[index].colorName}
                                onChange={(e) => {
                                  let tempCount = color;
                                  tempCount[index].colorName = e.target.value;
                                  setcount([...tempCount]);
                                }}
                                className="contact-form-area"
                              />

                              <Form.Control type="text" id={`colorinputbytext${index}`} maxLength="7" placeholder="Enter hex value of color"
                                onChange={(e) => {
                                  document.getElementById("colorinput" + index).value = e.target.value;
                                }} />
                              <Form.Control
                                type="color"
                                name="user_input"
                                style={{ width: "20%" }}
                                id={`colorinput${index}`}
                                value={color[index].colorValue}
                                className="user_input hide formbold-form-input"
                                onChange={(e) => {
                                  document.getElementById("colorinputbytext" + index).value = e.target.value;
                                  console.log("e.target.value" + e.target.value);
                                  let tempCount = color;
                                  tempCount[index].colorValue = e.target.value;
                                  setcount([...tempCount]);
                                }}
                              />
                              {index ? (
                                <button
                                  type="button"
                                  className="name noselect"
                                  onClick={() => removeFormFields(index)}
                                  style={{ border: "1px solid #C43434" }}
                                >
                                  <BsFillTrashFill />
                                </button>
                              ) : null}
                            </Form.Group>

                          </div>
                        ))}
                        <div className="button-section">
                          <button
                            className="name noselect m-20 "
                            type="button"
                            id="add_input"
                            onClick={() => addFormFields()}
                          >
                            Add
                          </button>
                        </div>
                      </Form.Group>

                    </div>
                    <Form.Group className="mb-3 my-3 visually-hidden" id="fontLink" >
                      <Form.Label>Font  links <small>(with respect there google font name)</small></Form.Label>
                      <div id="list" className="hide formbold-chatbox-form">
                        {fontLink.map((element, index) => (
                          <div id="fetch" key={index}>
                            <Form.Control
                              type="url"
                              // name="user_table_input"
                              id={"id"+index}
                              placeholder="Enter font url "
                              value={fontLink[index]}
                              onChange={(e) => {
                                let tempCount = fontLink;
                                tempCount[index] = e.target.value;
                                setFontLink([...tempCount]);

                              }}
                              className="contact-form-area"
                              name="myBrowser"
                            />
                            {document.getElementById(`id`+index)?.value === "" ? "" : <div >
                              {fontFamily?.data?.items && fontFamily?.data?.items?.filter(font => font?.family.includes(document.getElementById(`id`+index)?.value)).slice(0, 7).map((font) => (
                                <div id="myBrowser" key={font._id}>
                                  
                                    
                                        <div style={{ color: "black", textDecoration: "none", backgroundColor: "white" }}>
                                          {font.family}
                                        </div>
                                    
                                  
                                </div>
                              ))}
                            </div>
                            }



                            {index ? (
                              <button
                                type="button"
                                className="name noselect"
                                onClick={() => removeFontFields(index)}
                                style={{ border: "1px solid #C43434" }}
                              >
                                <BsFillTrashFill />
                                delete
                              </button>
                            ) : null}
                          </div>
                        ))}
                        <div className="button-section">
                          <Button
                            className="name noselect m-20 "
                            type="button"
                            id="add_input"
                            onClick={() => addFontFields()}
                          >
                            Add
                          </Button>
                        </div>
                      </div>

                    </Form.Group>

                    <div id="button" className=" visually-hidden">
                      {/* {location.state?.data ? ( */}
                      <Button variant="primary" onClick={() => (updateProfileValue())}>
                        Update
                      </Button>
                      {/* // ) : (
                    <Button variant="primary" onClick={() => storeProfileValue()}>
                      Submit
                    </Button>
                  // )} */}
                    </div>
                    <div id="nxt">
                      <Button variant="primary"
                        onClick={() => next()}
                      >
                        Next
                      </Button>
                    </div>
                  </Form>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
