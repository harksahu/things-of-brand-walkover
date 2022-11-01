import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createProfile } from "../api/index.js";
import { UserAuth } from "../context/AuthContext";
import { getProfileDetails } from "../api/index.js";
import {getCompanyDetails} from "../api/index.js";
import { updateProfileFields } from "../api/index.js";
import CloseIcon from "@mui/icons-material/Close";
import RichtextEditor from "./jodit.js";
import { async } from "@firebase/util";
import { useLocation } from "react-router-dom";

function Profile(props) {
  const [name, setName] = useState("");
  const [aboutus, setAboutus] = useState("");
  const [domain, setDomain] = useState("");
  const [guidlines, setGuidlines] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [PrimaryColors, setPrimaryColors] = useState("");
  const [secondaryColors, setSecondaryColors] = useState("");
  const [backgroundColors, setBackgroundColors] = useState("");
  const { user } = UserAuth();
  const [links, setLinks] = React.useState([]);
  const [results, setResults] = useState("");
  const [profiledata, setProfile] = useState("");
  const [check, setCheck] = useState(true);
  const [id,setId] = useState("");
  const location = useLocation();
  var fresult;

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
    console.log(location.state.data)
    setId(location.state.data._id)
    if (user) {
      if (user?.email) {
        profileDetails();
      }
    }
  }, [user]);

  const storeProfileValue = async (req, res) => {
    console.log(results);
    if (check) {
      if (user) {
        if (user?.email) {
            console.warn(fresult);
            try {
              const data = await createProfile({
                name,
                aboutus,
                links,
                domain,
                guidlines,
                fontSize,
                PrimaryColors,
                secondaryColors,
                backgroundColors,
                email: user?.email,
              });
              console.log(data);
              alert("saved successfully");
            } catch (err) {
              console.log(err);
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
      fontSize: fontSize,
      PrimaryColors: PrimaryColors,
      secondaryColors: secondaryColors,
      backgroundColors: backgroundColors,
      email: user?.email,
    };
    await updateProfileFields(data);
  };

  const profileDetails = async (req, res) => {
//     const fresult = await getCompanyDetails(
//       id
// )
    // console.log(location.state.data._id)
    // setResults(fresult.data.data[0]);
    if(location.state.data !=null){
        console.log("gnfbvc")
      setName(location.state.data.name);
      setAboutus(location.state.data.aboutus);
      setLinks(location.state.data.links);
      setDomain(location.state.data.domain);
      setGuidlines(location.state.data.guidlines);
      setFontSize(location.state.data.fontSize);
      setPrimaryColors(location.state.data.PrimaryColors);
      setSecondaryColors(location.state.data.secondaryColors);
      setBackgroundColors(location.state.data.backgroundColors);
    }
    console.log("gnihvcihvjcnihvcjnfbvc")
    // window.location.reload();
    // if (profiledata == null && profiledata == undefined) {
    //   const d = await getProfileDetails({});
    //   setProfile(d);
    // }
  };

  const checkDomain = (datta) => {
    console.log(datta);

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

  return (
    <h1>mbkm</h1>
    // <>
    //   <Form style={{ width: "30rem" }} className="text-center m-auto">
    //     <Form.Group className="mb-3" controlId="formBasicEmail">
    //       <Form.Label>name</Form.Label>
    //       <Form.Control
    //         type="name"
    //         placeholder="Enter name"
    //         onChange={(e) => {
    //           setName(e.target.value);
    //           console.log(e.target.value);
    //         }}
    //         value={name}
    //       />
    //     </Form.Group>

    //     <Form.Group className="mb-3" controlId="formBasicPassword ">
    //       <Form.Label>About us</Form.Label>
    //       <Form.Control
    //         type="aboutus"
    //         placeholder="AboutUs"
    //         onChange={(e) => setAboutus(e.target.value)}
    //         value={aboutus}
    //       />
    //     </Form.Group>

    //     <div className="tags-input mb-3" style={{ margin: "auto" }}>
    //       <h6>Social Links</h6>
    //       <ul>
    //         {links.map((link, index) => (
    //           <li key={index}>
    //             <span>{link}</span>
    //             <i
    //               className="material-icons"
    //               onClick={() => removeLinks(index)}
    //             >
    //               <CloseIcon />
    //             </i>
    //           </li>
    //         ))}
    //       </ul>
    //       <input
    //         type="text"
    //         onKeyUp={(event) => addLinks(event)}
    //         placeholder="Press enter to add tags"
    //       />
    //     </div>

    //     <Form.Group className="mb-3" controlId="formBasicPassword">
    //       <Form.Label>Domain</Form.Label>
    //       <Form.Control
    //         type="domain"
    //         placeholder="Enter domain name"
    //         list="doaminBrowsers"
    //         name="myBrowser"
    //         onChange={(e) => {
    //           setDomain(e.target.value);
    //           checkDomain(e.target.value);
    //         }}
    //         value={domain}
    //       />
    //       <datalist id="doaminBrowsers">
    //         {profiledata?.data?.data.map((brandData) => {
    //           return <option key={brandData._id} value={brandData.domain} />;
    //         })}
    //       </datalist>
    //       <div id="domain" style={{ color: "red" }}></div>
    //     </Form.Group>

    //     <Form.Group className="mb-3" controlId="formBasicPassword">
    //       <Form.Label>Guidlines</Form.Label>
    //       <RichtextEditor guidlines={guidlines} setGuidlines={setGuidlines} />
    //       {/* {value} */}
    //     </Form.Group>

    //     <Form.Group className="mb-3" controlId="formBasicPassword">
    //       <Form.Label>Colors</Form.Label>
    //       <Form.Control
    //         type="color"
    //         placeholder="Choose colors"
    //         onChange={(e) => setPrimaryColors(e.target.value)}
    //         value={PrimaryColors}
    //       ></Form.Control>
    //       <Form.Control
    //         type="color"
    //         placeholder="Choose colors"
    //         onChange={(e) => setSecondaryColors(e.target.value)}
    //         value={secondaryColors}
    //       />
    //     </Form.Group>

    //     <Form.Group className="mb-3" controlId="formBasicPassword">
    //       <Form.Label>Font size</Form.Label>
    //       <Form.Control
    //         type="guidlines"
    //         placeholder="Enter fontSize"
    //         onChange={(e) => setFontSize(e.target.value)}
    //         value={fontSize}
    //       />
    //     </Form.Group>

    //     <Form.Group className="mb-3" controlId="formBasicPassword">
    //       <Form.Label>Backround color</Form.Label>
    //       <Form.Control
    //         type="color"
    //         placeholder="Choose colors"
    //         onChange={(e) => setBackgroundColors(e.target.value)}
    //         value={backgroundColors}
    //       ></Form.Control>
    //     </Form.Group>
    //     <Button variant="primary" onClick={() => storeProfileValue()}>
    //       Submit
    //     </Button>
    //     <Button variant="primary" onClick={() => updateProfileValue()}>
    //       Update
    //     </Button>
    //   </Form>
    // </>
  );
}

export default Profile;
