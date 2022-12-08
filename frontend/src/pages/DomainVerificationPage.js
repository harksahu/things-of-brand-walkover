import React, { useEffect, useState } from "react";
import { updateProfileFields, getTXT } from "../api/index.js";
import { useLocation } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

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
  const location = useLocation();

  async function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    if (
      location?.state?.data?.verify == undefined ||
      location?.state?.data?.verify == null ||
      location?.state?.data?.verify === "false"
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
        console.log("not verify");
      }
    }
    if (!ifVerify) {
      document.getElementById("error").innerHTML = "not verify";
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
    makeid(15);
  }, []);
  return (
    <>
      <h1>Please verify domain {domain}</h1>

      <ListGroup variant="flush">
        <ListGroup.Item>Step 1: Get your verification code</ListGroup.Item>
        <ListGroup.Item>Step 2: Sign in to your domain host</ListGroup.Item>
        <ListGroup.Item>
          Step 3: Add the verification record to your domain's DNS records
        </ListGroup.Item>
        <ListGroup.Item>
          Step 4: Tell Thingsofbrand Workspace to check your verification code
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-center align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">verification code</div>
            <div
              style={{
                border: "2px solid #d4d4d4",
                backgroundColor: "#ececec",
              }}
            >
              {verify}
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
      <Button
        variant="primary"
        onClick={() => {
          verifyDomain();
        }}
      >
        verify
      </Button>
    </>
  );
}

export default DomainVerificationPage;
