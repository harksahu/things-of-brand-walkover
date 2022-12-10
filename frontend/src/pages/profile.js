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
} from "../api/index.js";
import CloseIcon from "@mui/icons-material/Close";
import { BsFillPlusCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import RichtextEditor from "./jodit.js";
import { BsFillTrashFill, BsChevronLeft } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";
import { useLocation, Link, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { Hint } from "react-autocomplete-hint";
import SvgInline from "../utils/SvgInline.js";
import Select from 'react-select'
// import { Tokenizer } from 'react-typeahead';
// import {  Typeahead } from 'react-bootstrap-typeahead';
import ClipLoader from "react-spinners/ClipLoader";



function Profile(props) {
  const [DomainPost, setDomainPost] = useState();
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
  const [results, setResults] = useState("");
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
  const [fontLink, setFontLink] = useState([""]);
  const [linkCount, setLinkCount] = useState(1);
  const [countTracker, setCountTracker] = useState(1);
  const [valid, setvalid] = useState([false]);
  const [valid2, setvalid2] = useState([false]);
  const [fontFamily, setFontFamily] = useState([false]);
  const [sharedEmail, setSharedEmail] = useState();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  let countTemp = countTracker;
  let countTemp2 = linkCount;
  var fresult;
  const navigate = useNavigate();


  const getbrandslogo = async () => {
    console.log("locatiom",location.state.data)
    if (domain && location.state?.data) {
      const data = await sendSearchAPI({ domain: id });

      setDomainPost(data?.data?.data);
      // console.log("domain ",data );
      }
      console.log("id ",id );

     
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
    // setLoading(true);
    
    console.log("useEffect",location?.state?.data)
    if (user) {
      if (user?.email) {

        profileDetails();
        
        // checkIfDomain();
      }
    }

  }, [user]);
  useEffect(() => {
    fontlist();
    if (domain) {
      getbrandslogo();
    }
  }, [domain]);
  const updateProfileValue = async (req, res) => {
    // console.log("idd",domain)
    if (name) {
      if (aboutus) {

        const data = {
          id: id,
          logo: logo,
          name: name,
          aboutus: aboutus,
          links: links,
          domain: domain,
          guidlines: guidlines,
          fontLink: fontLink,
          PrimaryColors: PrimaryColors,
          secondaryColors: secondaryColors,
          backgroundColors: backgroundColors,
          sharedEmail: sharedEmail,
          email: user?.email,
          color: color,
        };
        await updateProfileFields(data);
        navigate(-1);
      } else {
        alert("about us field is compulsory");
      }
    } else {
      alert("name field is compulsory");
    }
  };
  const profileDetails = async (req, res) => {
    console.log("domain hsdbjsd",location?.state?.data?.domain)
    fresult = await getProfileDetails({domain:location?.state?.data?.domain});
    // const ans =  await getCompanyDetails(id)
    // setResults(ans.data.data);
    console.log("fresult",fresult);
    if (location.state?.data != null) {
      setId(location?.state?.data?._id);
      setName(location?.state?.data?.name);
      setAboutus(location?.state?.data?.aboutus);
      setLinks(location?.state?.data?.links);
      setDomain(location?.state?.data?.domain);
      setGuidlines(location?.state?.data?.guidlines);
      setFontSize(location?.state?.data?.fontSize);
      setPrimaryColors(location?.state?.data?.PrimaryColors);
      setSecondaryColors(location?.state?.data?.secondaryColors);
      setBackgroundColors(location?.state?.data?.backgroundColors);
      setSharedEmail(location?.state?.data?.sharedEmail);
      setFontLink(location?.state?.data?.fontLink);
      setcount(location?.state?.data?.color);
      setLogo(location?.state?.data?.logo);
    }
    if (location.state?.data) {
      getbrandslogo();
    }
  };
  // function extractDomain(url) {
  //   var domainName;
  //   if (url.indexOf("://") > -1) {
  //     domainName = url.split("/")[2];
  //   } else {
  //     domainName = url.split("/")[0];
  //   }
  //   //find & remove www
  //   if (domainName.indexOf("www.") > -1) {
  //     domainName = domainName.split("www.")[1];
  //   }
  //   domainName = domainName.split(":")[0];
  //   domainName = domainName.split("?")[0];
  //   return domainName;
  // }
  const config = {
    buttons: ["bold", "italic"],
  };
  //   const checkIfDomain = () => {

  //   if (location.state?.data  ) {

  //    setDomain(location.state?.data?.domain);
  //   } 
  //   else{
  //     // navigate("companies/new")
  //   }
  // };
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
  };
  return (
    <div className="bg-gray h-100">

      <Container className="wrpr">
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
                    <Form.Group className="mb-3 " id="name">
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
                    </Form.Group>
                    <Form.Group className="mb-3 " id="about">
                      <Form.Label>About us</Form.Label>
                      <RichtextEditor
                        guidlines={aboutus}
                        setGuidlines={setAboutus}
                        config={config}
                        tabIndex={1}
                      />
                    </Form.Group>
                    {DomainPost ?
                      <div className="grid">
                        <h6>logos</h6>
                        <div className="d-flex flex-wrap justify-content-center">
                          {DomainPost?.map((brand, index) => {
                            return (
                              <div key={index}>
                                <div key={brand._id} className=" flex-wrap item">
                                  <Card>
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
                                        className="img_size"
                                      >
                                        <SvgInline {...brand} />
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
                                    </Card.Body>

                                  </Card>
                                  {user ? (
                                    user.email === user.email ? (
                                      logo === brand.url ? (
                                        <Button
                                          variant="light"
                                          size="sm"
                                          disabled
                                        >
                                          Default logo
                                        </Button>
                                      ) : (
                                        <Button
                                          variant="light"
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
                                  )
                                  
                                  
                                  
                                  }
                                </div>
                                <div>
                                  {
                                    (

                                      brand.active ? (
                                        <Button
                                        variant="light"
                                        size="sm"
                                        onClick={async () => {
                                          await deleteMyStuffAPI(brand?._id);
                                          // alert("Deleted");
                                          // window.location.reload();
                                          navigate(-1);
                                        }}
                                      >
                                        Delete
                                      </Button>
                                      ) : (
                                        <Button
                                        variant="light"
                                        size="sm"
                                        onClick={async () => {
                                          await restoreMyStuffAPI(brand?._id);
                                          // alert("restore")
                                          navigate(-1);
                                        }}

                                      >
                                        Restore
                                      </Button>
                                      )

                                    )
                                  }
                                </div>
                              </div>
                            );
                          })}

                          {user ? (
                            <Link
                              to="/addfile"
                              className="add-new item"
                              state={{ domain: domain }}
                            >
                              <Card className="h-100 item-company">
                                <Card.Body className="align-items-center card-body d-flex justify-content-center">
                                  <Card.Title className="text-center">
                                    <BsFillPlusCircleFill
                                      style={{ fontSize: 40 }}
                                    />
                                  </Card.Title>
                                  <Card.Text></Card.Text>
                                </Card.Body>
                                <div className="card-footer">
                                  <Button variant="link" size="sm">
                                    Add new Logo
                                  </Button>
                                </div>
                              </Card>
                            </Link>
                          ) : (
                            ""
                          )}
                        </div>
                      </div> : ""}
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
                    <Form.Group className="mb-3">
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
                          // setDomain(extractDomain(e.target.value));
                          setDomain(e.target.value);
                          // checkDomain(e.target.value);
                        }}
                        value={domain}
                      />
                      <div className="visually-hidden" id="domainError">
                        This company is already created{" "}
                        <Link to="/domainVerify" state={{ data: company }}>
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
                    </Form.Group>
                    <Form.Group className="mb-3" id="Guidlines">
                      <Form.Label>Guidlines</Form.Label>
                      <RichtextEditor
                        guidlines={guidlines}
                        setGuidlines={setGuidlines}
                        tabIndex={1}
                      />
                    </Form.Group>
                    <div
                        className="hide formbold-chatbox-form"
                      id="list"
                    >
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
                              <Form.Control
                                type="text"
                                id={`colorinputbytext${index}`}
                                maxLength="7"
                                placeholder="Enter hex value of color"
                                onChange={(e) => {
                                  document.getElementById(
                                    "colorinput" + index
                                  ).value = e.target.value;
                                }}
                              />

                              <Form.Control

                                type="color"
                                name="user_input"
                                style={{ width: "20%" }}
                                id={`colorinput${index}`}
                                value={color[index].colorValue}
                                className="user_input hide formbold-form-input"
                                onChange={(e) => {
                                  document.getElementById(
                                    "colorinputbytext" + index
                                  ).value = e.target.value;
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
                    <Form.Group
                      className="mb-3 my-3"
                      id="fontLink"
                    >
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
                                // name="user_table_input"
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
                            {/* <Typeahead
                              type="url"
                              // name="user_table_input"
                              id={"id" + index}
                              placeholder="Enter font name "
                              value={fontLink[index]}
                              onChange={(e) => {
                                let tempCount = fontLink;
                                tempCount[index] = e.target.value;
                                setFontLink([...tempCount]);
                              }}
                              className="contact-form-area form-control"
                              name="myBrowser"
                              renderMenuItemChildren={(fontFamily) => (
                                  <span>{fontFamily}</span>
                              )}
                              useCache={false}
                            /> */}
                            {/* {document.getElementById(`id`+index)?.value === "" ? "" : <div >
                              {fontFamily?.data?.items && fontFamily?.data?.items?.filter(font => font?.family.includes(document.getElementById(`id`+index)?.value)).slice(0, 7).map((font) => (
                                <div id="myBrowser" key={font._id}>
                                        <div style={{ color: "black", textDecoration: "none", backgroundColor: "white" }}>
                                          {font.family}
                                        </div>
                                </div>
                              ))}
                            </div>
                            } */}
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
                      {/* // ) : (
                    <Button variant="primary" onClick={() => storeProfileValue()}>
                      Submit
                    </Button>
                  // )} */}
                    </div>
                    {/* <div className="d-flex flex-wrap justify-content-center">
              {DomainPost?.map((brand, index) => {
                // console.log(brand);
                return (
                  <div key={index}>
                    <div key={brand._id} className=" flex-wrap item">
                      <Card>
                        <Link to={"/stuff/" + brand._id}>
                          <div
                            style={{ overflow: "auto" }}
                            className="img_size"
                          >
                            <SvgInline {...brand} />
                          </div>
                          <Card.Body>
                            <Card.Title
                              style={{ textDecoration: "none" }}
                              className="text-center"
                            >
                              {brand.title}
                            </Card.Title>
                          </Card.Body>
                        </Link>
                      </Card>
                    </div>
                  </div>
                );
New
3:00
})}
            </div> */}
                  </Form>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </div>
  );
          }
export default Profile;
