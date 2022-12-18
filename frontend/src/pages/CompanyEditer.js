import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  Stack,
} from "react-bootstrap";
import colors from "../api/colors.json";
import { Autocomplete } from "@mui/material";
import { TextField, Box } from "@mui/material";

import { UserAuth } from "../context/AuthContext";
import {
  getProfileDetails,
  updateProfileFields,
  getCompanyDetails,
  getFontList,
  createProfile,
  deleteMyStuffAPI,
  restoreMyStuffAPI,
  saveMyStuffAPI,
  sendSearchAPI,
} from "../api/Index.js";
import CloseIcon from "@mui/icons-material/Close";
import { BsFillPlusCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import RichtextEditor from "./JoditEditor.js";
import { BsFillTrashFill, BsChevronLeft } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";
import { useLocation, Link, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { Hint } from "react-autocomplete-hint";
// import SvgInline from "../utils/SvgInline.js";
import Select from "react-select";
// import { Tokenizer } from 'react-typeahead';
// import {  Typeahead } from 'react-bootstrap-typeahead';
import ClipLoader from "react-spinners/ClipLoader";
import InputComponent from "../components/InputComponent.js";

function Profile(props) {
  const [inputValue, setInputValue] = React.useState("");
  const [DomainPost, setDomainPost] = useState();
  const [jsonLabel, setJsonLabel] = useState([]);
  const [jsonValue, setJsonValue] = useState([]);
  const [name, setName] = useState("");
  const [defaultLogo, setDefaultLogo] = useState("");
  const [aboutus, setAboutus] = useState("");
  const [domain, setDomain] = useState("");
  const [guidlines, setGuidlines] = useState("");
  const [fontSize, setFontSize] = useState([]);
  const [PrimaryColors, setPrimaryColors] = useState("");
  const [secondaryColors, setSecondaryColors] = useState("");
  const [backgroundColors, setBackgroundColors] = useState("");
  const { user } = UserAuth();
  const [links, setLinks] = React.useState([]);
  const [company, setCompany] = useState("");
  const [profiledata, setProfile] = useState("");

  const [check, setCheck] = useState(true);
  const [id, setId] = useState("");
  const [logo, setLogo] = useState();
  const [verify, setVerify] = useState("false");
  const [show, setShow] = useState(false);
  const [color, setcount] = useState([
    { colorName: "", colorValue: "#FFFFFF" },
  ]);
  const [value, setValue] = useState([]);
  const [fontLink, setFontLink] = useState([""]);
  const [linkCount, setLinkCount] = useState(1);
  const [countTracker, setCountTracker] = useState(1);
  const [valid, setvalid] = useState([false]);
  const [valid2, setvalid2] = useState([false]);
  const [fontFamily, setFontFamily] = useState([false]);
  const [sharedEmail, setSharedEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState();

  const location = useLocation();
  let countTemp = countTracker;
  let countTemp2 = linkCount;
  var fresult;
  const navigate = useNavigate();

  const getAllData = async () => {
    var allDataTemp = await getProfileDetails({});
    setAllData(allDataTemp.data.data);
  };
  const getbrandslogo = async () => {
    if (domain && location.state?.data && id) {
      const data = await sendSearchAPI({ domain: id });

      setDomainPost(data?.data?.data);
    }
  };
  const setJsonLabelAndValue = async () => {
    colors.map((colors, index) => {
      var temp = jsonLabel;
      temp.push(colors.label);
      setJsonLabel(temp);
      temp = jsonValue;
      temp.push(colors.value);
      setJsonValue(temp);
    });
  };
  // const getData = async () => {
  //   fetch("../src/api/colors .json", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then(function (response) {
  //       console.log(response);
  //       // return response.json();
  //     })
  //     .then(function (myJson) {
  //       console.log(myJson);
  //     });
  // };
  function extractDomain(url) {
    var domainName;
    if (url.indexOf("://") > -1) {
      domainName = url.split("/")[2];
    } else {
      domainName = url.split("/")[0];
    }
    //find & remove www
    if (domainName.indexOf("www.") > -1) {
      domainName = domainName.split("www.")[1];
    }
    domainName = domainName.split(":")[0];
    domainName = domainName.split("?")[0];
    return domainName;
  }

  const addLinks = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setLinks([...links, event.target.value]);
      // props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  const savedata = async (id, n) => {
    const new_data = {
      _id: id,
      title: n,
    };
    await saveMyStuffAPI(new_data);
  };
  const removeLinks = (index) => {
    setLinks([...links.filter((link) => links.indexOf(link) !== index)]);
  };
  const fontlist = async () => {
    const data = await getFontList();
    var result = [];
    for (var i in data?.data?.items) result.push(data?.data?.items[i]?.family);
    setFontFamily(result);
  };
  useEffect(() => {
    setLoading(true);

    if (user) {
      if (user?.email) {
        setJsonLabelAndValue();
        profileDetails();
        // getData();
      }
    }
  }, [user]);
  useEffect(() => {
    fontlist();
    if (domain) {
      getbrandslogo();
    }
    if (!location?.state?.data?.domain) {
      navigate("/my-companies");
    }
  }, [domain]);
  const updateProfileValue = async (req, res) => {
    var checkTemp = 0;

    if (domain != location?.state?.data?.domain) {
      for (let i = 0; i < allData?.length; i++) {
        if (allData[i].domain === domain) {
          checkTemp = 1;
          break;
        }
      }
    }

    var domainParts = domain.split(".");
    if (domainParts.length >= 2 && domainParts[1].length >= 1) {
      if (checkTemp == 0) {
        if (name) {
          if (aboutus) {
            const domainTemp = extractDomain(domain);
            const data = {
              _id: id,
              logo: logo,
              name: name,
              aboutus: aboutus,
              links: links,
              domain: domainTemp,
              guidlines: guidlines,
              fontLink: fontLink,
              PrimaryColors: PrimaryColors,
              secondaryColors: secondaryColors,
              backgroundColors: backgroundColors,
              sharedEmail: sharedEmail,
              email: user?.email,
              color: color,
            };
            const id1 = await updateProfileFields(data);

            navigate(-1);
          } else {
            alert("About us field is compulsory");
          }
        } else {
          alert("Name field is compulsory");
        }
      } else {
        alert("Domain should be unique");
      }
    } else {
      alert("Enter proper domain");
    }
  };
  const profileDetails = async (req, res) => {
    fresult = await getProfileDetails({
      domain: location?.state?.data?.domain,
    });
    setLoading(false);
    if (location.state?.data != null) {
      setId(location?.state?.data?._id);
      setName(location?.state?.data?.name);
      setAboutus(location?.state?.data?.aboutus);
      setLinks(location?.state?.data?.links);
      setGuidlines(location?.state?.data?.guidlines);
      setFontSize(location?.state?.data?.fontSize);
      setPrimaryColors(location?.state?.data?.PrimaryColors);
      setSecondaryColors(location?.state?.data?.secondaryColors);
      setBackgroundColors(location?.state?.data?.backgroundColors);
      setSharedEmail(location?.state?.data?.sharedEmail);
      setFontLink(location?.state?.data?.fontLink);
      setcount(location?.state?.data?.color);
      setLogo(location?.state?.data?.logo);
      setDomain(location?.state?.data?.domain);
      let colorData = [];
      location?.state?.data?.color.map((colorDataTemp) => {
        colorData.push({
          "label": colorDataTemp?.colorValue,
          "value": colorDataTemp?.colorValue
        })
      })
      console.log("colorData", colorData);
      setValue(colorData)

    }
    if (location.state?.data) {
      getAllData();
      getbrandslogo();
    }
  };



  useEffect(() => {

  }, [value]);


  const config = {
    buttons: ["bold", "italic"],
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
    setcount([...color, { colorName: "", colorValue: "#000000" }]);
    setCountTracker(countTemp + 1);
    setValue([...value, { label: "Black", value: "#F0FFFF" }]);
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
    let newFormValues = [...color];
    newFormValues.splice(i, 1);
    setcount(newFormValues);
    let newFormVaild = [...valid];
    newFormVaild.splice(i, 1);
    setvalid(newFormVaild);
    let newFormValues1 = [...value];
    newFormValues1.splice(i, 1);
    setValue(newFormValues1);


  };
  return (
    <div className="bg-gray h-100">
      {loading ? (
        <div className="center-loader">
          <ClipLoader />
        </div>
      ) : (
        <Container className="wrpr w-100">
          <Row>
            <nav className="navbar bg-light">
              <div className="container-fluid">
                <a
                  className="navbar-brand"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <button type="button" className="btn btn-light me-3">
                    <MdArrowBackIos />
                  </button>
                  Add new brand
                </a>
              </div>
            </nav>
            <Col md={12} lg={12}>
              <Card style={{ width: "35rem" }} className="bdr-none box-shadow">
                <Card.Body>
                  <Stack gap={3}>
                    <Form>
                      {/* <Form.Group className="mb-3 " id="name">
                        <Form.Label>name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter name"
                          aria-describedby="btnGroupAddon"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          value={name}
                        />
                      </Form.Group> */}
                      <InputComponent label={"Name"} setValue={setName} valuee={name} />
                      <Form.Group className="mb-3 " id="about">
                        <Form.Label>About us</Form.Label>
                        <RichtextEditor
                          guidlines={aboutus}
                          setGuidlines={setAboutus}
                          config={config}
                          tabIndex={1}
                        />
                      </Form.Group>
                      {DomainPost ? (
                        <div className="grid">
                          <h6>logos</h6>
                           <div className="grid d-flex"style={{ overflow: "auto" }}>
                           {DomainPost?.map((brand, index) => {
                              return (
                                <div key={index} className="d-flex flex-wrap d-flex justify-content-center ">

                                  <div
                                    key={brand._id}
                                    className="item "
                                  >
                                    <Card  className="box-shadow">
                                      {/* <Dropdown className="ms-auto">
                                      <Dropdown.Toggle variant="light" size="sm">
                                        <BsThreeDotsVertical />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item
                                          onClick={() => {
                                            setShow(true);
                                          }}
                                        >
                                          Rename
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={async () => {
                                            await deleteMyStuffAPI(brand?._id);
                                            // alert("Deleted");
                                            // window.location.reload();
                                            navigate(-1);
                                          }}
                                          variant="outline-secondary"
                                          size="sm"
                                        >
                                          Delete
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown> */}
                                      <Link to={"/stuff/" + brand._id}>
                                        <div
                                          style={{ overflow: "auto" }}
                                          className="img_size  pattern-square"
                                        >
                                          {brand.url !== undefined &&
                                            brand.url !== "null" ? (
                                            <img src={brand.url} alt="" />
                                          ) : (
                                            <img
                                              src="/assets/picture.svg"
                                              alt=""
                                            />
                                          )}
                                        </div>
                                      </Link>
                                      <Card.Body>
                                        <Card.Title
                                          style={{ textDecoration: "none" }}
                                          className="text-center"
                                        >
                                          <div>
                                            {/* {
                                          show ? (
                                            <input
                                              id="userInputBox"
                                              onChange={(e) => {
                                                savedata(brand.title, e.target.value);
                                              }}
                                              value={brand.title}
                                              className="form-control form-control-sm"
                                              autoFocus
                                            />
                                          ) : ( */}
                                            <div
                                              id="showname"
                                              onClick={() => {
                                                setShow(true);
                                              }}
                                            >
                                              {brand.title}
                                            </div>
                                            {/* )} */}
                                          </div>
                                        </Card.Title>
                                        <Card.Footer>
                                          {user ? (
                                            user.email === user.email ? (
                                              logo === brand.url ? (
                                                <Button
                                                  variant="outline-secondary"
                                                  size="sm"
                                                  disabled
                                                >
                                                  Default logo
                                                </Button>
                                              ) : (
                                                <Button
                                                  variant="outline-secondary"
                                                  size="sm"
                                                  onClick={() => {
                                                    setLogo(brand.url);
                                                  }}
                                                >
                                                  Make default
                                                </Button>
                                              )
                                            ) : (
                                              ""
                                            )
                                          ) : (
                                            ""
                                          )}
                                          {brand.active ? (
                                            <Button
                                              variant="outline-secondary"
                                              size="sm"
                                              onClick={async () => {
                                                await deleteMyStuffAPI(brand?._id);

                                                navigate(-1);
                                              }}
                                            >
                                              Delete
                                            </Button>
                                          ) : (
                                            <Button
                                              variant="outline-secondary"
                                              size="sm"
                                              onClick={async () => {
                                                await restoreMyStuffAPI(brand?._id);

                                                navigate(-1);
                                              }}
                                            >
                                              Restore
                                            </Button>
                                          )}
                                        </Card.Footer>
                                      </Card.Body>
                                    </Card>

                                  </div>
                                  <div>

                                  </div>
                                </div>
                              );
                            })}

                            {user ? (
                            <Link to="/addfile" className="add-new" state={{ domain: domain }}>
                            <Card className="item">
                              <Card.Body className="add-icon align-items-center d-flex justify-content-center">
                                <Card.Title className="text-center">
                                  <BsFillPlusCircleFill style={{ fontSize: 40 }} />
                                </Card.Title>
                                <Card.Text></Card.Text>
                              </Card.Body>
                              <Card.Body>
                                <Card.Title>Add New File</Card.Title>
                              </Card.Body>
                              <div className="card-footer">
                                <Button variant="outline-light" size="sm">
                                  -
                                </Button>
                              </div>
                            </Card>
                          </Link>
                            ) : (
                              ""
                            )}
                           </div>

                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        className="tags-input mb-3 "
                        id="socialLinks"
                        style={{ margin: "auto" }}
                      >
                        <h6>Social Links</h6>
                        <ul>
                          {links?.map((link, index) => (
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
                      {/* <Form.Group className="mb-3">
                        <Form.Label>
                          Domain * <small>(example.com)</small>
                        </Form.Label>
                        <Form.Control
                          type="domain"
                          placeholder="Enter domain name"
                          list="doaminBrowsers"
                          autoComplete="off"
                          name="myBrowser"
                          id="domain"
                          onChange={(e) => {
                            setDomain(e.target.value);
                          }}
                          value={domain}
                        />
                        <div className="visually-hidden" id="domainError">
                          This company is already created{" "}
                          <Link to="/domainverify" state={{ data: company }}>
                            Clam your brand
                          </Link>
                        </div>
                        {/* autocompate domain */}
                      {/* <datalist id="doaminBrowsers">
                        {results &&
                          results.map((brandData) => {
                            return <option key={brandData._id} value={brandData.domain} />;
                          })}
                      </datalist> */}
                      {/* </Form.Group> */}
                      <InputComponent label={"Domain * <small>(example.com)</small>"} setValue={setDomain} valuee={domain} />

                      <Form.Group className="mb-3" id="Guidlines">
                        <Form.Label>Guidlines</Form.Label>
                        <RichtextEditor
                          guidlines={guidlines}
                          setGuidlines={setGuidlines}
                          tabIndex={1}
                        />
                      </Form.Group>
                      <div className="hide formbold-chatbox-form" id="list">
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Color<small>(hex code in #123456 format)</small>{" "}
                          </Form.Label>
                          {color?.map((element, index) => (
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

                                {/* {console.log("value of index", value)}
                                {console.log("value of color", color)} */}
                                <Autocomplete
                                  value={value[index]}
                                  onChange={(e, newValue) => {
                                    if (newValue.value != undefined) {
                                      // setValue(newValue)
                                      // console.log("value", newValue);
                                      document.getElementById(
                                        "colorinput" + index
                                      ).value = newValue.value;
                                      let tempCount = color;
                                      tempCount[index].colorValue =
                                        newValue.value;
                                      setcount([...tempCount]);
                                      let tempCount1 = value;
                                      tempCount1[index] = newValue;
                                      setValue([...tempCount1]);
                                      console.log(tempCount1);
                                    } else if (newValue.includes("#")) {
                                      document.getElementById(
                                        "colorinput" + index
                                      ).value = newValue;
                                      let tempCount1 = value;
                                      tempCount1[index].label = newValue;
                                      tempCount1[index].value = newValue;
                                      setValue([...tempCount1]);
                                      console.log("else if ", tempCount1);
                                    } else {
                                      document.getElementById(
                                        "colorinput" + index
                                      ).value = newValue;
                                      let tempCount1 = value;
                                      tempCount1[index].label = newValue;
                                      tempCount1[index].value = newValue;
                                      setValue([...tempCount1]);
                                      console.log(tempCount1);
                                    }
                                  }}
                                  freeSolo
                                  // inputValue={inputValue}
                                  onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                    if (newInputValue.includes("#")) {
                                      // console.log("value", newInputValue);
                                      let tempCount1 = value;
                                      tempCount1[index].label = newInputValue;
                                      tempCount1[index].value = newInputValue;
                                      setValue([...tempCount1]);
                                      document.getElementById(
                                        "colorinput" + index
                                      ).value = newInputValue;
                                      let tempCount = color;
                                      tempCount[index].colorValue =
                                        newInputValue;
                                      setcount([...tempCount]);
                                    }
                                  }}
                                  getOptionLabel={(option) => option.label}
                                  id={`controllable-states-demo${index}`}
                                  options={colors}
                                  sx={{ width: 300 }}
                                  renderInput={(params) => (
                                    <TextField {...params} label="Colors" />
                                  )}
                                />
                                <Form.Control
                                  type="color"
                                  name="user_input"
                                  style={{ width: "20%" }}
                                  id={`colorinput${index}`}
                                  value={color[index].colorValue}
                                  className="user_input hide formbold-form-input"
                                  onChange={(e) => {
                                    value[index] = {
                                      label: e.target.value,
                                      value: e.target.value
                                    };
                                    setValue([...value]);
                                    let tempCount = color;
                                    tempCount[index].colorValue =
                                      e.target.value;
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
                      <Form.Group className="mb-3 my-3" id="fontLink">
                        <Form.Label>
                          Font links{" "}
                          <small>(with respect there google font name)</small>
                        </Form.Label>
                        <div id="list" className="hide formbold-chatbox-form">
                          {fontLink?.map((element, index) => (
                            <div id="fetch" key={index}>
                              <Hint options={fontFamily}>
                                <input
                                  type="url"
                                  id={"id" + index}
                                  autoComplete="off"
                                  placeholder="Enter font name "
                                  value={fontLink[index]}
                                  onChange={(e) => {
                                    let tempCount = fontLink;
                                    tempCount[index] = e.target.value;
                                    setFontLink([...tempCount]);
                                  }}
                                  className="contact-form-area form-control"
                                  name="myBrowser"
                                />
                              </Hint>
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
                      <div id="button" className="">
                        {/* {location.state?.data ? ( */}
                        <Button
                          variant="primary"
                          onClick={() => updateProfileValue()}
                        >
                          Update
                        </Button>
                      </div>
                    </Form>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
export default Profile;