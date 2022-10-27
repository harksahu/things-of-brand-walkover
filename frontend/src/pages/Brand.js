import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../utils/svginline.css";
import "./home.css";
import { UserAuth } from "../context/AuthContext";
import {
  getProfileDetails,
  sendSearchAPI,
  updateProfileFields,
  getTXT
} from "../api/index.js";
import SvgInline from "../utils/SvgInline.js";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import { FcApproval, FcHighPriority } from "react-icons/fc";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

function Not_found() {
  return (
    <Figure className="text-center flex justify-cont">
      <Figure.Image
        width={500}
        height={500}
        alt="171x180"
        src="https://i.pinimg.com/564x/f4/e0/d9/f4e0d998d00d96269eeb30c8c625031b.jpg"
      />
      <Figure.Caption>Data not found</Figure.Caption>
    </Figure>
  );
}

function Brand() {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [aboutus, setAboutus] = useState();
  const [domain, setDomain] = useState();
  const [logo, setlogo] = useState();
  const [guidlines, setGuidlines] = useState();
  const [fontSize, setFontSize] = useState();
  const [PrimaryColors, setPrimaryColors] = useState();
  const [secondaryColors, setSecondaryColors] = useState();
  const [backgroundColors, setBackgroundColors] = useState();
  const [email, setEmail] = useState();
  const { user } = UserAuth();
  const [links, setLinks] = React.useState([]);
  const [results, setResults] = useState();
  const [DomainPost, setDomainPost] = useState();
  const [verify, setVerify] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  const verifyDomain = async()=>{
    const TXT = await getTXT(domain)
    console.log(TXT?.data?.data[0][0]);
    console.log(TXT?.data?.data);
    // console.log("['abcdefghijklmnop']");
    console.log("abcdefghijklmnop");
    console.log(TXT?.data?.data[0] == "abcdefghijklmnop");
    console.log(verify)

  }


  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}




  const title = useParams();
  // console.log(title.title);

  const getbrandslogo = async () => {
    console.log(domain);
    if (domain) {
      const data = await sendSearchAPI({ domain: id, active: 1 });
      console.log(data);
      setDomainPost(data?.data?.data);
    }
  };

  const getbrand = async () => {
    const fresult = await getProfileDetails({ domain: title.title });
    console.log(fresult);

    console.warn(fresult.data.data[0]);

    setId(fresult.data.data[0]._id);
    setName(fresult.data.data[0].name);
    setAboutus(fresult.data.data[0].aboutus);
    setLinks(fresult.data.data[0].links);
    setDomain(fresult.data.data[0].domain);
    setGuidlines(fresult.data.data[0].guidlines);
    setFontSize(fresult.data.data[0].fontSize);
    setPrimaryColors(fresult.data.data[0].PrimaryColors);
    setSecondaryColors(fresult.data.data[0].secondaryColors);
    setlogo(fresult.data.data[0].logo);
    setBackgroundColors(fresult.data.data[0].backgroundColors);
    setEmail(fresult.data.data[0].email);
    // setVerify(fresult.data.data[0].verify);

    getbrandslogo();
  };

  const updateLogo = async (logo_url) => {
    const data = {
      name: name,
      aboutus: aboutus,
      logo: logo_url,
      links: links,
      domain: domain,
      guidlines: guidlines,
      fontSize: fontSize,
      PrimaryColors: PrimaryColors,
      secondaryColors: secondaryColors,
      backgroundColors: backgroundColors,
      email: email,
    };
    await updateProfileFields(data);
  };

  useEffect(() => {
    getbrand();
    if (domain) {
      getbrandslogo();
    }
  }, [domain]);

  return (
    <>
      {domain ? (
        <div className="m-5">
          <div>
            <h1>{name}</h1>
          </div>
          <div>{aboutus}</div>
          <br />
          <div>
            <a
              href={"https://" + domain}
              target="_blank"
              rel="noopener noreferrer"
            >
              {domain}
            </a>
            {
              email === user.email ? (
                (verify==="true") ? (<FcApproval />) :
                  (<> <FcHighPriority />
                    <button
                      className="m-auto btn btn-primary"
                      onClick={() => { handleShow() }}>verify</button></>)
              ) :  ""
            }
          </div>
          <br />
          <div>
            Guidelines
            <p>
              <a target="_blank" rel="noopener noreferrer">
                {" "}
                How to create ads
              </a>
            </p>
            <p>
              <a target="_blank" rel="noopener noreferrer">
                {" "}
                How to use fonts
              </a>
            </p>
          </div>
          <div>
            <h5>Logos</h5>
            <div className="d-flex flex-wrap justify-content-center">
              {DomainPost?.map((brand) => {
                // console.log(brand);
                return (
                  <div>
                    <div key={brand._id} className=" flex-wrap item">
                      <Link to={"/popup/" + brand._id}>
                        <Card>
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
                            <Card.Text></Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
                    {email === user.email ? (
                      logo === brand.url ? (
                        <button
                          className="d-flex m-auto btn btn-success"
                          disabled
                        >
                          default logo
                        </button>
                      ) : (
                        <button
                          className="d-flex m-auto btn btn-primary"
                          onClick={() => {
                            setlogo(brand.url);
                            updateLogo(brand.url);
                          }}
                        >
                          Make default
                        </button>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h5>Colors</h5>
            <div className="d-flex">
              <div
                id="primary"
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: PrimaryColors,
                  margin: 5,
                }}
              ></div>
              <div
                id="secondary"
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: secondaryColors,
                  margin: 5,
                }}
              ></div>
            </div>
          </div>
          <div>
            <h5>Fonts Size</h5>
            <div style={{ fontSize: fontSize + "px" }}>{fontSize + "px"}</div>
          </div>
          <br />
          <div>
            <h5>background Colors</h5>
            <div className="d-flex">
              <div
                id="background"
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: backgroundColors,
                  margin: 5,
                }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <Not_found />
      )}





      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>PLease verify domain {domain}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <ListGroup variant="flush">
      <ListGroup.Item>Step 1: Get your verification code</ListGroup.Item>
      <ListGroup.Item>Step 2: Sign in to your domain host</ListGroup.Item>
      <ListGroup.Item>Step 3: Add the verification record to your domain's DNS records</ListGroup.Item>
      <ListGroup.Item>Step 4: Tell Thingsofbrand Workspace to check your verification code</ListGroup.Item>
    </ListGroup>
    <ListGroup.Item className="m-auto">
        {
        verify != undefined || verify != null?
       verify
       :
      makeid(15)
      //  console.log(verify)

        }
</ListGroup.Item>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{verifyDomain()}}>
            verify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Brand;
