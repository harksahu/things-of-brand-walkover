import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {createProfile} from "../api/index.js"

function Profile() {
  const [name, setName] = useState();
  const [aboutus, setAboutus] = useState();
  const [links, setLinks] = useState();
  const [domain, setDomain] = useState();
  const [guidlines, setGuidlines] = useState();
  const [fontSize, setFontSize] = useState();
  const [PrimaryColors, setPrimaryColors] = useState();
  const [secondaryColors, setSecondaryColors] = useState();
  const [backgroundColors, setBackgroundColors] = useState();

//   const Show = () => {
//     console.log(
//       "name: " +
//         name +
//         "\naboutus:" +
//         aboutus +
//         "\nlinks:" +
//         links +
//         "\ndomains:" +
//         domain +
//         "\nguidlines" +
//         guidlines +
//         "\nfontSize" +
//         fontSize +
//         "\nprimaryColor" +
//         PrimaryColors +
//         "\nsecondaryColor" +
//         secondaryColors +
//         "\nbackgroundColor" +
//         BackgroundColors
//     );
//   };
  const storeProfileValue = async(req,res)=>{
    try{
        const data = await createProfile({
            name,
            aboutus,
            links,
            domain,
            guidlines,
            fontSize,
            PrimaryColors,
            secondaryColors,
            backgroundColors
            })
            console.log(data);

    }catch(err){    
        console.log(err); 
    } 
  
        
  }
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
            // value={name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword ">
          <Form.Label>About us</Form.Label>
          <Form.Control
            type="aboutus"
            placeholder="AboutUs"
            onChange={(e) => setAboutus(e.target.value)}
            //value={aboutus}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Social Links</Form.Label>
          <Form.Control
            type="links"
            placeholder="Enter linkes"
            onChange={(e) => setLinks(e.target.value)}
            //   value={links}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Domain</Form.Label>
          <Form.Control
            type="domain"
            placeholder="Enter domain name"
            onChange={(e) => setDomain(e.target.value)}
            // value={domain}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Guidlines</Form.Label>
          <Form.Control
            type="guidlines"
            placeholder="Enter guidlines"
            onChange={(e) => setGuidlines(e.target.value)}
            //   value={guidlines}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Colors</Form.Label>
          <Form.Control
            type="color"
            placeholder="Choose colors"
            onChange={(e) => setPrimaryColors(e.target.value)}
            //  value={PrimaryColors}
          ></Form.Control>
          <Form.Control
            type="color"
            placeholder="Choose colors"
            onChange={(e) => setSecondaryColors(e.target.value)}
            // value={secondaryColors}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Font size</Form.Label>
          <Form.Control
            type="guidlines"
            placeholder="Enter fontSize"
            onChange={(e) => setFontSize(e.target.value)}
            //   value={fontSize}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Backround color</Form.Label>
          <Form.Control
            type="color"
            placeholder="Choose colors"
            onChange={(e) => setBackgroundColors(e.target.value)}
            // value={BackgroundColors}
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
