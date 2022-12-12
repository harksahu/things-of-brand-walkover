import React, { useEffect, useState } from "react";
import { updateProfileFields, getTXT } from "../api/index.js";
import { useLocation, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Button, InputGroup } from "react-bootstrap";
import { MdArrowBackIos, MdContentCopy } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
function DomainVerificationPage() {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [aboutus, setAboutus] = useState();
  const [domain, setDomain] = useState();
  const [logo, setlogo] = useState();
  const [links, setLinks] = React.useState([]);
  const [allColor, setAllColor] = useState();
  const [guidlines, setGuidlines] = useState();
  const [email, setEmail] = useState();
  const [sharedEmail, setSharedEmail] = useState([]);
  const [fontLink, setFontLink] = useState([]);
  const [company, setCompany] = useState([]);
  const [verify, setVerify] = useState();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  async function makeid() {
    
    var result = "thingsofbrand-domain-verification="+uuidv4();
    if (
      location?.state?.data?.verify == undefined ||
      location?.state?.data?.verify == null ||
      location?.state?.data?.verify === "false" ||
      !location?.state?.data?.verify.includes("thingsofbrand-domain-verification=") 

    ) {
      setVerify(result);

      await updateVerify(result);
    }

    return result;
  }

  const verifyDomain = async () => {
    const TXT = await getTXT(domain);

    var ifVerify = false;
    for (let i = 0; i < TXT?.data?.data.length; i++) {
      if (TXT?.data?.data[i][0] == verify) {
        updateVerify("true");
        ifVerify = true;
        break;
      } else {
        // console.log("not verify");
      }
    }
    if (!ifVerify) {
      document.getElementById("msg").innerHTML = "not verify";
      document.getElementById("msg").style.color = "red";
    }
    else{
      document.getElementById("msg").innerHTML = "Verify Done";
      document.getElementById("msg").style.color = "green";
    }
  };

  const updateVerify = async (result) => {
    const data = {
      name: location?.state?.data?.name,
      aboutus: location?.state?.data?.aboutus,
      logo: location?.state?.data?.logo,
      links: location?.state?.data?.links,
      domain: location?.state?.data?.domain,
      guidlines: location?.state?.data?.guidlines,

      color: location?.state?.data?.color,
      email: location?.state?.data?.email,
      verify: result,
    };

    if (verify === undefined || verify === null || verify === "false") {
      await updateProfileFields(data);
    }
  };

  const Fetchdata = async () => {
    setId(location?.state?.data?._id);
    setName(location?.state?.data?.name);
    setAboutus(location?.state?.data?.aboutus);
    setLinks(location?.state?.data?.links);
    setDomain(location?.state?.data?.domain);
    setGuidlines(location?.state?.data?.guidlines);

    setFontLink(location?.state?.data?.fontLink);

    setAllColor(location?.state?.data?.color);
    setlogo(location?.state?.data?.logo);
    setEmail(location?.state?.data?.email);
    setVerify(location?.state?.data?.verify);
    setSharedEmail(location?.state?.data?.sharedEmail);
  };

  useEffect(() => {
    Fetchdata();
    makeid();
  }, []);
  return (
    <Container>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <a
            className="navbar-brand"
          >
            <Button
              variant="outline-dark"
              className="me-3"
              onClick={() => {
                navigate(-1);
              }}
            >
              <MdArrowBackIos />
            </Button>
            Please verify <strong>{domain}</strong>
          </a>
        </div>
      </nav>

      <ListGroup variant="flush">
        <ListGroup.Item>
          <div>
          1. Sign in to your domain name provider (e.g. godaddy.com )
          </div>
          <br />
          <div>
          2. Copy the TXT record below into the DNS configuration for
          </div>
          {/* <InputGroup className="my-2">
            <InputGroup.Text>thingsofbrand-domain-verification</InputGroup.Text>
            <InputGroup.Text><MdContentCopy /></InputGroup.Text>
          </InputGroup> */}
        </ListGroup.Item>
        <ListGroup.Item>
          <div>
            Use this code for value of the TXT record
          </div>
          <InputGroup className="my-2">
            <InputGroup.Text>{verify}</InputGroup.Text>
            <InputGroup.Text  onClick={() => {navigator.clipboard.writeText(verify);setShow(true)}}><MdContentCopy /> </InputGroup.Text>
          </InputGroup>
        </ListGroup.Item>
        <ListGroup.Item>This could take up to 24 hours to propagate, Wait until your DNS configuration changes then click verify</ListGroup.Item>

        <ListGroup.Item>
          <Button
            variant="primary"
            onClick={() => {
              verifyDomain();
            }}
          >
            verify
          </Button>
        </ListGroup.Item>
        <div id="msg"></div>
      </ListGroup>



      <ToastContainer className="p-3" position='bottom-center'>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} style={{backgroundColor : "#c5c6d0"}} autohide>
          <Toast.Body>Copy in clipboard!</Toast.Body>
        </Toast>
        </ToastContainer>
    </Container>
  );
}

export default DomainVerificationPage;
