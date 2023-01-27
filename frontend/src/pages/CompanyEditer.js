import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Form,
  Button,
  Modal,
  Stack,
  ListGroup,
  OverlayTrigger,
  Tooltip,
  Dropdown
} from "react-bootstrap";
import colors from "../api/colors.json";
import { Autocomplete, TextField } from "@mui/material";
import Addfile from "./Addfile.js";
import { UserAuth } from "../context/AuthContext";
import AlertComponent from "../components/AlertComponent";
import {
  getProfileDetails,
  updateProfileFields,
  getS3SignUrlOfAssets,
  getFontList,
  deleteMyStuffAPI,
  restoreMyStuffAPI,
  sendSearchAPI,
} from "../api/Index.js";
import { BsFillPlusCircleFill } from "react-icons/bs";
import RichtextEditor from "./JoditEditor.js";
import { MdArrowBackIos, MdDelete, MdRestoreFromTrash, MdDone } from "react-icons/md";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import InputComponent from "../components/InputComponent.js";
import DeleteComponent from "../components/DeleteComponent.js";

function Profile() {
  const [DomainPost, setDomainPost] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [jsonLabel, setJsonLabel] = useState([]);
  const [jsonValue, setJsonValue] = useState([]);
  const [name, setName] = useState("");
  const [aboutus, setAboutus] = useState("");
  const [domain, setDomain] = useState("");
  const [guidlines, setGuidlines] = useState("");
  const [PrimaryColors, setPrimaryColors] = useState("");
  const [secondaryColors, setSecondaryColors] = useState("");
  const [backgroundColors, setBackgroundColors] = useState("");
  const { user } = UserAuth();
  const [links, setLinks] = React.useState([]);
  const [fullscreen, setFullscreen] = useState(true);
  const [id, setId] = useState("");
  const [logo, setLogo] = useState();
  const [show, setShow] = useState(false);
  const [msgForAlert, setMsgForAlert] = useState(false);
  const [color, setcount] = useState([
    { colorName: "", colorValue: "#FFFFFF" },
  ]);
  const [value, setValue] = useState([]);
  const [fontLink, setFontLink] = useState([]);
  const [linkCount, setLinkCount] = useState(1);
  const [countTracker, setCountTracker] = useState(1);
  const [imgCount, setImgCount] = useState(1);
  const [imgTracker, setImgTracker] = useState(1);
  const [valid, setvalid] = useState([false]);
  const [valid2, setvalid2] = useState([false]);
  const [fontFamily, setFontFamily] = useState([false]);
  const [sharedEmail, setSharedEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [showLinkError, setShowLinkError] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const [ImgSections, setImgSections] = useState([]);
  const [TextSections, setTextSections] = useState([]);
  const location = useLocation();
  let countTemp = countTracker;
  let countTemp2 = linkCount;
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
    colors.map((colors) => {
      var temp = jsonLabel;
      temp.push(colors.label);
      setJsonLabel(temp);
      temp = jsonValue;
      temp.push(colors.value);
      setJsonValue(temp);
    });
  };

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
    setShowLinkError(false);
    if (event.key === "Enter" && event.target.value !== "") {
      var check = event.target.value.split(".");
      if (!check[1] || check[1]?.length < 5) {
        setShowLinkError(true)
        return
      }
      setLinks([...links, event.target.value]);
      event.target.value = "";
    }
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
      }
    }
  }, [user]);


  useEffect(() => {
    if (domain && show === false)
      getbrandslogo(id)
  }, [show])

  useEffect(() => {
    fontlist();
    if (domain) {
      getbrandslogo();
    }
    if (!location?.state?.data?.domain) {
      navigate("/my-companies");
    }
  }, [domain]);
  const updateProfileValue = async () => {

    if (domain != location?.state?.data?.domain) {
      for (let i = 0; i < allData?.length; i++) {
        if (allData[i].domain === domain) {
          window.scrollTo(0, 0);
          setShowAlert(true);
          setMessage("Domain should be unique");
          return;
        }
      }
    }

    var domainParts = domain.split(".");
    if (domainParts.length <= 2 && (domainParts[1]?.length <= 1 || !domainParts[1])) {
      window.scrollTo(0, 0)
      setShowAlert(true);
      setMessage("Enter proper domain");
      return;
    }

    if (!name) {
      window.scrollTo(0, 0);
      setShowAlert(true);
      setMessage("Name field is compulsory");
      return;
    }

    if (!aboutus) {
      window.scrollTo(0, 0);
      setShowAlert(true);
      setMessage("About us field is compulsory");
      return;
    }
    const value = ImgSections

    for(let i=0;i<ImgSections?.length;i++)
    {   
        const data = await getS3SignUrlOfAssets(ImgSections[i].imageValue)
        value[i].imageValue = data
        setImgSections(value);

    }
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
      ImageSections: value,
      TextSections:TextSections
    };
    await updateProfileFields(data);

    navigate("/" + domain);
  };
  const profileDetails = async () => {
    await getProfileDetails({
      domain: location?.state?.data?.domain,
    });
    setLoading(false);
    if (location.state?.data != null) {
      setId(location?.state?.data?._id);
      setName(location?.state?.data?.name);
      setAboutus(location?.state?.data?.aboutus);
      setLinks(location?.state?.data?.links);
      setGuidlines(location?.state?.data?.guidlines);

      setPrimaryColors(location?.state?.data?.PrimaryColors);
      setSecondaryColors(location?.state?.data?.secondaryColors);
      setBackgroundColors(location?.state?.data?.backgroundColors);
      setSharedEmail(location?.state?.data?.sharedEmail);
      setFontLink(location?.state?.data?.fontLink);
      setcount(location?.state?.data?.color);
      setLogo(location?.state?.data?.logo);
      setDomain(location?.state?.data?.domain);
      setTextSections(location?.state?.data?.TextSections);
      setImgSections(location?.state?.data?.ImageSections);
      let colorData = [];
      location?.state?.data?.color.map((colorDataTemp) => {
        colorData.push({
          label: colorDataTemp?.colorValue,
          value: colorDataTemp?.colorValue,
        });
      });
      setValue(colorData);
    }
    if (location.state?.data) {
      getAllData();
      getbrandslogo();
    }
  };

  useEffect(() => { }, [value]);

  const config = {
    buttons: ["bold", "italic"],
  };

  let addFormFields = () => {
    setcount([...color, { colorName: "", colorValue: "#000000" }]);
    setCountTracker(countTemp + 1);
    setValue([...value, { label: "Black", value: "#F0FFFF" }]);
  };
  let removeFormFields = (i) => {
    setCountTracker(countTemp - 1);
    // document.getElementById("add_input").classList.remove("hide");
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
  let addFontFields = () => {
    setFontLink([...fontLink, ""]);
    setLinkCount(countTemp2 + 1);
  };
  let removeFontFields = (i) => {
    setLinkCount(countTemp2 - 1);
    // document.getElementById("add_input").classList.remove("hide");
    let newFormValues = [...fontLink];
    newFormValues.splice(i, 1);
    setFontLink(newFormValues);
    let newFormVaild = [...valid2];
    newFormVaild.splice(i, 1);
    setvalid2(newFormVaild);
  };

  let addImageFeild = () => {
    setImgSections([...ImgSections, { imageName: "", imageValue: "" }]);
    // setLinkCount(countTemp2 + 1);
  };

  let removeImageField = (i) => {
    let newFormValues = [...ImgSections];
    newFormValues.splice(i, 1);
    setImgSections(newFormValues);
  };

  let addTextFeild = () => {
    setTextSections([...TextSections, { textName: "", textValue: "" }]);
    // setLinkCount(countTemp2 + 1);
  };
  let removeTextField = (i) => {
    let newFormValues = [...TextSections];
    newFormValues.splice(i, 1);
    setTextSections(newFormValues);
  };

  function handleShow() {
    setFullscreen("md-down");
    setShow(true);
  }

  return (
    <div className="bg-light flex-fill">
      <AlertComponent
        message={message}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
      <DeleteComponent
        show={modalShow}
        msg={msgForAlert}
        setmodalshow={setModalShow}
        onSubmit={() => {
          msgForAlert == "Delete" ?
            deleteMyStuffAPI(idToDelete)
            : restoreMyStuffAPI(idToDelete);
          navigate(-1)
        }} />

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
                  <button type="button" className="btn btn-outline-dark me-3">
                    <MdArrowBackIos />
                    Back
                  </button>
                </a>
              </div>
            </nav>
            <Stack gap={3}>
              <Form>
                <div className="col-lg-6 col-md-7 col-sm-12">
                  <InputComponent
                    placeholderr={"Enter domain"}
                    label={"Domain * "}
                    smalll={"(example.com)"}
                    setValue={setDomain}
                    valuee={domain}
                    className="mb-3"
                  />
                  <InputComponent
                    label={"Name"}
                    setValue={setName}
                    valuee={name}
                    autoFocus={true}
                  />
                  <Form.Group className="mb-3 " id="about">
                    <Form.Label>About us</Form.Label>
                    <RichtextEditor
                      guidlines={aboutus}
                      setGuidlines={setAboutus}
                      config={config}
                      tabIndex={'0'}
                    />
                  </Form.Group>
                  <div
                    className="tags-input mb-3 "
                    id="socialLinks"
                    style={{ margin: "auto" }}
                  >
                    <h6>Social Links</h6>
                    <ListGroup>
                      {links?.map((link, index) => (
                        <ListGroup.Item
                          className="d-flex align-items-center"
                          key={index}
                        >
                          <div className="flex-fill">{link}</div>
                          <Button
                            onClick={() => removeLinks(index)}
                            variant="light"
                          >
                            <MdDelete />
                          </Button>
                        </ListGroup.Item>
                      ))}
                      <ListGroup.Item>
                        <Form.Control
                          type="url"
                          onKeyUp={(event) => addLinks(event)}
                          placeholder="Enter URL"
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                          Press enter to add link
                        </Form.Text>
                      </ListGroup.Item>
                    </ListGroup>

                    {showLinkError && (
                      <small style={{ color: "red" }}>
                        Enter Correct link{" "}
                      </small>
                    )}
                  </div>
                </div>

                {DomainPost ? (
                  <div>
                    <h6>logos</h6>
                    <div className="grid mb-3" style={{ overflow: "auto" }}>
                      {DomainPost?.map((brand, index) => {
                        return (
                          <Card key={brand._id} className="box-shadow border-0">
                            { }
                            <Link className="h-100" to={"/stuff/" + brand._id}>
                              <div
                                style={{ overflow: "auto" }}
                                className="img-size  pattern-square h-100"
                              >
                                {brand.url !== undefined &&
                                  brand.url !== "null" ? (
                                  <img src={brand.url} alt="" />
                                ) : (
                                  <img src="/assets/picture.svg" alt="" />
                                )}
                              </div>
                            </Link>
                            <Card.Body className="d-flex align-items-center">
                              <div className="flex-fill">
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
                                // onClick={() => {
                                //   setShow(true);
                                // }}
                                >
                                  {brand.title}
                                </div>
                                {/* )} */}
                              </div>
                              {(user &&
                                user.email === user.email) ? (
                                logo === brand.url ? (
                                  <button className="btn-icon" disabled>
                                    <MdDone />
                                  </button>
                                ) : (
                                  <OverlayTrigger
                                    key={`tip-def-${index}`}
                                    overlay={
                                      <Tooltip id={`tip-def-${index}`}>
                                        Set as default
                                      </Tooltip>
                                    }
                                  >
                                    <button
                                      type="button"
                                      className="btn-icon"
                                      onClick={() => {
                                        setLogo(brand.url);
                                      }}
                                    >
                                      <MdDone />
                                    </button>
                                  </OverlayTrigger>
                                )

                              ) : (
                                ""
                              )}
                              {brand.active ? (
                                <OverlayTrigger
                                  key={`tip-${index}`}
                                  overlay={
                                    <Tooltip id={`tip-del-${index}`}>
                                      Delete
                                    </Tooltip>
                                  }
                                >
                                  <button
                                    type="button"
                                    className="btn-icon"
                                    onClick={async () => {
                                      setModalShow(true);
                                      setIdToDelete(brand?._id)
                                      setMsgForAlert("Delete")

                                    }}
                                  >
                                    <MdDelete />
                                  </button>
                                </OverlayTrigger>
                              ) : (
                                <OverlayTrigger
                                  key={`tip-res-${index}`}
                                  overlay={
                                    <Tooltip id={`tip-res-${index}`}>
                                      Restore
                                    </Tooltip>
                                  }
                                >
                                  <button
                                    type="button"
                                    className="btn-icon"
                                    onClick={async () => {
                                      setModalShow(true);
                                      setIdToDelete(brand?._id)
                                      setMsgForAlert("Restore")

                                    }}
                                  >
                                    <MdRestoreFromTrash />
                                  </button>
                                </OverlayTrigger>
                              )}
                            </Card.Body>
                          </Card>
                        );
                      })}

                      {user ? (
                        <div className="add-new">
                          <Card
                            className="item box-shadow border-0"
                            onClick={() => handleShow()}
                          >
                            <Card.Body className="add-icon align-items-center d-flex justify-content-center">
                              <Card.Title className="text-center">
                                <BsFillPlusCircleFill
                                  style={{ fontSize: 40 }}
                                />
                              </Card.Title>
                              <Card.Text></Card.Text>
                            </Card.Body>
                            <Card.Body>
                              <Card.Title>Add New File</Card.Title>
                            </Card.Body>
                          </Card>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="col-lg-6 col-md-7 col-sm-12">
                  {/* <Form.Group className="mb-3" id="Guidlines">
                    <Form.Label>Guidlines</Form.Label>
                    <RichtextEditor
                      guidlines={guidlines}
                      setGuidlines={setGuidlines}
                      tabIndex={'0'}
                    />
                  </Form.Group> */}
                  <div className="hide formbold-chatbox-form" id="list">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Color{" "}
                        <small className="text-muted">
                          (hex code, eg. #000000)
                        </small>{" "}
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
                              className="contact-form-area me-1"
                            />
                            <div className="color-picker-wrp me-1">
                              <Autocomplete
                                value={value[index]}
                                onChange={(e, newValue) => {
                                  if (newValue.value != undefined) {
                                    // setValue(newValue)
                                    document.getElementById(
                                      "colorinput" + index
                                    ).value = newValue.value;
                                    let tempCount = color;
                                    tempCount[index].colorValue = newValue.value;
                                    setcount([...tempCount]);
                                    let tempCount1 = value;
                                    tempCount1[index] = newValue;
                                    setValue([...tempCount1]);
                                  } else if (newValue.includes("#")) {
                                    document.getElementById(
                                      "colorinput" + index
                                    ).value = newValue;
                                    let tempCount1 = value;
                                    tempCount1[index].label = newValue;
                                    tempCount1[index].value = newValue;
                                    setValue([...tempCount1]);
                                  } else {
                                    document.getElementById(
                                      "colorinput" + index
                                    ).value = newValue;
                                    let tempCount1 = value;
                                    tempCount1[index].label = newValue;
                                    tempCount1[index].value = newValue;
                                    setValue([...tempCount1]);
                                  }
                                }}
                                freeSolo
                                // inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                  // setInputValue(newInputValue);
                                  if (newInputValue.includes("#")) {
                                    let tempCount1 = value;
                                    tempCount1[index].label = newInputValue;
                                    tempCount1[index].value = newInputValue;
                                    setValue([...tempCount1]);
                                    document.getElementById(
                                      "colorinput" + index
                                    ).value = newInputValue;
                                    let tempCount = color;
                                    tempCount[index].colorValue = newInputValue;
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
                                id={`colorinput${index}`}
                                value={color[index].colorValue}
                                className="user_input hide formbold-form-input color-picker"
                                onChange={(e) => {
                                  value[index] = {
                                    label: e.target.value,
                                    value: e.target.value,
                                  };
                                  setValue([...value]);
                                  let tempCount = color;
                                  tempCount[index].colorValue = e.target.value;
                                  setcount([...tempCount]);
                                }}
                              />
                            </div>

                            <button
                              type="button"
                              className="name noselect btn"
                              onClick={() => removeFormFields(index)}
                            >
                              <MdDelete />
                            </button>

                          </Form.Group>
                        </div>
                      ))}

                      <div className="button-section">
                        <Button variant="link"
                          onClick={() => addFormFields()}
                        >
                          Add new color
                        </Button>
                      </div>
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3 my-3" id="fontLink">
                    <Form.Label>
                      Font links
                      <small>(by <a href="https://fonts.google.com/" className="text-muted">https://fonts.google.com/</a>)</small>
                    </Form.Label>
                    <div className="">
                      {fontLink?.map((element, index) => (
                        <div className="d-flex mb-3" key={index}>
                          <Autocomplete
                            className="me-1"
                            getOptionLabel={(option) => option}
                            value={fontLink[index]}
                            placeholder="Enter font name"
                            id={"id" + index}
                            options={fontFamily}
                            onChange={(e, newValue) => {
                              let tempCount = fontLink;
                              tempCount[index] = newValue;
                              setFontLink([...tempCount]);
                            }}
                            // getOptionSelected
                            isOptionEqualToValue={() => true}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                              <TextField {...params} label="Fonts" />
                            )}
                          />
                          <button
                            type="button"
                            className="btn"
                            onClick={() => removeFontFields(index)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      ))}
                      <div className="button-section">
                        <Button variant="link"

                          onClick={() => addFontFields()}>
                          Add new font
                        </Button>
                      </div>
                    </div>
                  </Form.Group>
                </div>
                <div  className="col-lg-6 col-md-7 col-sm-12">
                  {ImgSections?.map((element, index) => (
                    <div key={index}>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="user_label_input"
                          placeholder="Enter Image Section name"
                          value={ImgSections[index].imageName}
                          onChange={(e) => {
                            let tempCount = ImgSections;
                            tempCount[index].imageName = e.target.value;
                            setImgSections([...tempCount]);
                          }}
                          className="contact-form-area me-1"
                        />
                        <Form.Control
                          type="file"
                          name="user_input"
                          className="user_input hide formbold-form-input color-picker"
                          // value={ImgSections[index].imageValue}
                          onChange={(e) => {
                            let tempCount = ImgSections;
                            tempCount[index].imageValue = e.target.value;
                            setImgSections([...tempCount]);
                          }}
                        />

                        <button
                          type="button"
                          className="name noselect btn"
                          onClick={() => removeImageField(index)}
                        >
                          <MdDelete />
                        </button>

                      </Form.Group>
                    </div>
                  ))}
                  {TextSections?.map((element, index) => (
                    <div key={index}>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="user_label_input"
                          placeholder="Enter Text Section name"
                          value={TextSections[index].textName}
                          onChange={(e) => {
                            let tempCount = TextSections;
                            tempCount[index].textName = e.target.value;
                            setTextSections([...tempCount]);
                          }}
                          className="contact-form-area me-1"
                        />
                        <RichtextEditor
                          guidlines={TextSections}
                          setGuidlines={setTextSections}
                          tabIndex={'0'}
                          index={index}
                          type={true}
                        />

                        <button
                          type="button"
                          className="name noselect btn"
                          onClick={() => removeTextField(index)}
                        >
                          <MdDelete />
                        </button>

                      </Form.Group>
                    </div>
                  ))}
                </div>
              </Form>
            </Stack>
          </Row>

          <div className="d-flex edit-brand-footer bg-light">
            <Button
              variant="primary"
              onClick={() => updateProfileValue()}
            >
              Update
            </Button>
            <Dropdown style={{ paddingLeft: "3px" }}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Add section
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { addImageFeild() }}>Image</Dropdown.Item>
                <Dropdown.Item onClick={() => { addTextFeild() }}>TextArea</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Modal
            show={show}
            fullscreen={fullscreen}
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <Addfile domain={domain} />
            </Modal.Body>
          </Modal>
        </Container>
      )}
    </div>
  );
}
export default Profile;
