import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { createProfile } from "../api/index.js";
import { UserAuth } from "../context/AuthContext";
import { getProfileDetails } from "../api/index.js";
import { getCompanyDetails } from "../api/index.js";
import { updateProfileFields } from "../api/index.js";
import CloseIcon from "@mui/icons-material/Close";
import RichtextEditor from "./jodit.js";
import { async } from "@firebase/util";
import { FcFullTrash } from "react-icons/fc";
import { useLocation } from "react-router-dom";
import SideBar from '../components/SideBar';

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
  const [profiledata, setProfile] = useState("");
  const [check, setCheck] = useState(true);
  const [id,setId] = useState("");
  const [logo,setLogo] = useState("null");
  const [verify,setVerify] = useState("false");
  const [color, setcount] = useState([{ colorName: "", colorValue: "" }]);
  const [fontLink, setFontLink] = useState([""]);
  const [linkCount, setLinkCount] = useState(1);
  const [countTracker, setCountTracker] = useState(1);
  const [valid, setvalid] = useState([false]);
  const [valid2, setvalid2] = useState([false]);
  const location = useLocation();
  let countTemp = countTracker;
  let countTemp2 = linkCount
  var fresult

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

  useEffect(() => {
    // console.log(location?.state?.data)
    setId(location?.state?.data?._id);
    if (user) {
      if (user?.email) {
        profileDetails();
      }
    }
  }, [user]);

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
            console.log(data);
            alert("saved successfully");
          } catch (err) {
            console.log(err);
            alert("Profile is not created");
          }
        }
      }
    }
  };
  const updateProfileValue = async (req, res) => {
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
  };

  const profileDetails = async (req, res) => {
    fresult = await getProfileDetails({});
    console.log(fresult.data.data);
    // console.log("profiledata = ",profiledata);
    setResults(fresult.data.data);
    // console.log("profiledata = ",profiledata);

    if (location.state?.data != null) {
      // console.log("gnfbvc")
      // setProfile(location.state.data)
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

    // console.log(profiledata)
    // console.log("gnihvcihvjcnihvcjnfbvc")
    // window.location.reload();
    // if (profiledata == null && profiledata == undefined) {
    //   const d = await getProfileDetails({});
    //   setProfile(d);
    // }
  };


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
      setcount([...color, { colorName: "",colorValue : "#000000" }]);
      setCountTracker(countTemp + 1);
      // console.log(countTracker);
  };
  let addFontFields = () => {
    setFontLink([...fontLink ,""]);
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
    <Container fluid >
      <Row>        
        <Col md={3} lg={2}>
          <SideBar/>
        </Col>
        <Col md={9} lg={10}>
          <Form style={{ width: "30rem" }} className="text-center m-auto">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                onChange={(e) => {
                  setName(e.target.value);
                  console.log(e.target.value);
                }}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword ">
              <Form.Label>About us</Form.Label>
              <Form.Control
                type="aboutus"
                placeholder="AboutUs"
                onChange={(e) => setAboutus(e.target.value)}
                value={aboutus}
              />
            </Form.Group>

            <div className="tags-input mb-3" style={{ margin: "auto" }}>
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
              <input
                type="text"
                onKeyUp={(event) => addLinks(event)}
                placeholder="Press enter to add tags"
              />
            </div>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Domain</Form.Label>
              <Form.Control
                type="domain"
                placeholder="Enter domain name"
                list="doaminBrowsers"
                name="myBrowser"
                onChange={(e) => {
                  setDomain(e.target.value);
                  checkDomain(e.target.value);
                }}
                value={domain}
              />

              <datalist id="doaminBrowsers">
                {results &&
                  results.map((brandData) => {
                    console.log(brandData.domain);
                    return <option key={brandData._id} value={brandData.domain} />;
                  })}
              </datalist>
              {/* <div id="domain" style={{ color: "red" }}></div> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Guidlines</Form.Label>
              <RichtextEditor guidlines={guidlines} setGuidlines={setGuidlines} />
            </Form.Group>

            <div id="list" className="hide formbold-chatbox-form">
                    {color.map((element, index) => (
                      <div id="fetch" key={index}>
                        <input
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
                        <input
                          type="color"
                          name="user_input"
                          id={`colorinput${index}`}
                          value={color[index].colorValue}
                          className="user_input hide formbold-form-input"
                          onChange={(e) => {
                            document.getElementById( "colorinputbytext" + index).value = e.target.value;
                            console.log("e.target.value" +e.target.value);
                            let tempCount = color;
                            tempCount[index].colorValue = e.target.value;
                            setcount([...tempCount]);
                          }}
                        />
                        <input type = "text" id = {`colorinputbytext${index}`} maxLength="7" placeholder="Enter hex value of color" 
                        onChange={(e) => {
                          document.getElementById( "colorinput" + index).value = e.target.value;
                        }}/>
                        {index ? (
                          <button
                            type="button"
                            className="name noselect"
                            onClick={() => removeFormFields(index)}
                            style={{ border: "1px solid #C43434" }}
                          >
                            <FcFullTrash />
                          </button>
                        ) : null}
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
                  </div>
            <Form.Group className="mb-3 my-3" controlId="formBasicPassword">
              <Form.Label>Font  links</Form.Label>
              <div id="list" className="hide formbold-chatbox-form">
                    {fontLink.map((element, index) => (
                      <div id="fetch" key={index}>
                        <input
                          type="url"
                          name="user_table_input"
                          id={index}
                          placeholder="Enter font url "
                          value={fontLink[index]}
                          onChange={(e) => {
                            let tempCount = fontLink;
                            tempCount[index] = e.target.value;
                            setFontLink([...tempCount]);
                          }}
                          className="contact-form-area"
                        />      
                        {index ? (
                          <button
                            type="button"
                            className="name noselect"
                            onClick={() => removeFontFields(index)}
                            style={{ border: "1px solid #C43434" }}
                          >
                            <FcFullTrash />
                            delete
                          </button>
                        ) : null}
                      </div>
                    ))}
                    <div className="button-section">
                      <button
                        className="name noselect m-20 "
                        type="button"
                        id="add_input"
                        onClick={() => addFontFields()}
                      >
                        Add
                      </button>
                    </div>
                  </div>
              {/* <Form.Control
                type="guidlines"
                placeholder="Enter fontSize"
                onChange={(e) => setFontSize(e.target.value)}
                value={fontSize}
              /> */}
            </Form.Group> 


            {location.state?.data ? (
              <Button variant="primary" onClick={() => updateProfileValue()}>
                Update
              </Button>
            ) : (
              <Button variant="primary" onClick={() => storeProfileValue()}>
                Submit
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Profile;
