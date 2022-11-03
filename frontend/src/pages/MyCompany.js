import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { getProfileDetails } from "../api/index.js";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import SvgInline from "../utils/SvgInline.js";
import "../utils/svginline.css";
import { AiFillPlusCircle } from "react-icons/ai";
import Row from "react-bootstrap/Row";


function MyCompany() {
  const [company, setCompany] = useState();
  const { user } = UserAuth();
  useEffect(() => {
    if (user) {
      if (user?.email) {
        profileDetails();
      }
    }
  }, [user]);
  let fresult;
  const profileDetails = async (req, res) => {
    // console.warn(params)
    fresult = await getProfileDetails({ email: user.email });
    setCompany(fresult.data.data);
    // fresult = await getProfileDetails();
    // console.log(fresult);
  };
  
  
  return (
    <>
    <div className=" m-3 ">
      <Link to="/profile">
        <AiFillPlusCircle style={{float: "right" , fontSize: 40}}/>
        </Link>
        <h1 className="text-center">Your Company</h1>

        <Row md={4} className="g-4 flex p-3 bg-light">
        {company?.map((Company) => {
          return (
      <div key={Company._id} className="d-flex justify-content-center item">
        <Link to="/profile" state={{ data: Company}}
        >
          <Card>
            <div style={{ overflow: "auto" }} className="img_size">
              <SvgInline url={Company.logo} />
            </div>
            <Card.Body>
              <Card.Title
                style={{ textDecoration: "none" }}
                className="text-center"
              >
                {Company.name}
              </Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </div>
    );
  })}
        </Row>
      </div>
      </>
  
  );
  
}

export default MyCompany;
