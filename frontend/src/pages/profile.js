import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createProfile } from "../api/index.js";
import { UserAuth } from "../context/AuthContext";
import { getProfileDetails } from "../api/index.js";
import { updateProfileFields } from "../api/index.js";
import CloseIcon from "@mui/icons-material/Close";
import RichtextEditor from "./jodit.js";
import { async } from "@firebase/util";

function Profile() {
  const [name, setName] = useState();
  const [aboutus, setAboutus] = useState();
  const [domain, setDomain] = useState();
  const [guidlines, setGuidlines] = useState();
  const [fontSize, setFontSize] = useState();
  const [PrimaryColors, setPrimaryColors] = useState();
  const [secondaryColors, setSecondaryColors] = useState();
  const [backgroundColors, setBackgroundColors] = useState();
  const { user } = UserAuth();
  const [links, setLinks] = React.useState([]);
  const [results, setResults] = useState();
  const [profiledata, setProfile] = useState();
  const [check, setCheck] = useState(true);

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
    if (user) {
      if (user?.email) {
        profileDetails();
      }

    }
  }, [user]);



  const storeProfileValue = async (req, res) => {
    console.log(results);
 if(check){
  if (user) {
    if (user?.email) {
      if (results) {
        updateProfileValue();
        alert("updated successfully");
      } else {
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
  // else{

  // }
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
      email: user?.email
    };
    await updateProfileFields(data);
  };

  const profileDetails = async (req, res) => {
    // console.warn(params)


    fresult = await getProfileDetails({ email: user.email });
    setResults(fresult.data.data[0]);
    console.warn(fresult);
    console.warn(fresult.data.data[0]);
    setName(fresult.data.data[0].name);
    setAboutus(fresult.data.data[0].aboutus);
    setLinks(fresult.data.data[0].links);
    setDomain(fresult.data.data[0].domain);
    setGuidlines(fresult.data.data[0].guidlines);
    setFontSize(fresult.data.data[0].fontSize);
    setPrimaryColors(fresult.data.data[0].PrimaryColors);
    setSecondaryColors(fresult.data.data[0].secondaryColors);
    setBackgroundColors(fresult.data.data[0].backgroundColors);
    // console.log(result.data.data[0].name)
    // console.log(result.data.data[0].aboutus)
    // console.log("1."+profiledata);
    if (profiledata == null && profiledata == undefined) {
      // console.log("2."+profiledata);
      const d = await getProfileDetails({});
      setProfile(d)
    }

  };
  // console.log(profiledata);
  const checkDomain = (datta) => {
    console.log(datta);
    // console.log(profiledata.data.data[0].domain);

    for (let i = 0; i < profiledata?.data?.data?.length; i++) {

      // console.log(profiledata?.data?.data[i]);
      // console.log(profiledata?.data?.data[i].domain);
      if (datta == profiledata?.data?.data[i].domain) {
        // console.log("copy");
        const domainId = document.getElementById("domain")
        domainId.innerHTML = "**this domain already resister**"
        setCheck(false)
      }
     else {
        // console.log("copy");
        const domainId = document.getElementById("domain")
        setCheck(true)
        // domainId.style.color = "green"
        // domainId.innerHTML = "**please verify this **"
      }
    }
  };
  return (
    <>
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

        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Social Links</Form.Label>
          <Form.Control
            type="links"
            placeholder="Enter linkes"
            onChange={(e) => setLinks(e.target.value)}
              value={links}
          />
        </Form.Group> */}

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
            onChange={(e) => { setDomain(e.target.value); checkDomain(e.target.value) }}
            value={domain}
            
          />
          <datalist id="doaminBrowsers">
            {profiledata?.data?.data.map((brandData) => {
              return (<option key={brandData._id} value={brandData.domain} />);

            })}
          </datalist>
          <div id="domain" style={{color:"red"}}>
      
    </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Guidlines</Form.Label>
          <RichtextEditor guidlines={guidlines} setGuidlines={setGuidlines} />
          {/* {value} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Colors</Form.Label>
          <Form.Control
            type="color"
            placeholder="Choose colors"
            onChange={(e) => setPrimaryColors(e.target.value)}
            value={PrimaryColors}
          ></Form.Control>
          <Form.Control
            type="color"
            placeholder="Choose colors"
            onChange={(e) => setSecondaryColors(e.target.value)}
            value={secondaryColors}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Font size</Form.Label>
          <Form.Control
            type="guidlines"
            placeholder="Enter fontSize"
            onChange={(e) => setFontSize(e.target.value)}
            value={fontSize}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Backround color</Form.Label>
          <Form.Control
            type="color"
            placeholder="Choose colors"
            onChange={(e) => setBackgroundColors(e.target.value)}
            value={backgroundColors}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={() => storeProfileValue()}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Profile;
