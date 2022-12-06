import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { getProfileDetails } from "../api/index.js";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SvgInline from "../utils/SvgInline.js";
import "../utils/svginline.css";
import "../scss/company.scss";
import { BsFillPlusCircleFill } from "react-icons/bs";
import SideBar from '../components/SideBar';

function MyCompany() {
  const [company, setCompany] = useState();
  const[sharedEmail,setSharedEmail] = useState();
  const { user } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (user) {
      if (user?.email) {
        profileDetails();
      }
    }
  }, [user]);
  let fresult;
  const profileDetails = async (req, res) => {
    fresult = await getProfileDetails({ email: user.email });
    setCompany(fresult.data.data);

    console.log(fresult.data.data);
    if (Array.isArray(fresult.data.data) && fresult.data.data.length) {
      // console.log("efsad");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="h-100">
    <Container>
        <div className="grid">
          {company?.map((Company) => {
            return (
              <div
                key={Company._id}
                className="d-flex justify-content-center item"
              >
                {/* <Link to={"/profile" }state={{ data: Company }}> */}
                <Link to={'/' + Company.domain}>
                  <Card className="item-company">
                    <div style={{ overflow: "auto" }} className="img_size">
                    {Company?.logo ? (
                      <SvgInline url={Company.logo} />
                    ):(
                      <img src="/assets/picture.svg" />
                    )}                      
                    </div>
                    <Card.Body>
                      <Card.Title
                        style={{ textDecoration: "none" }}
                        className="text-center"
                      >
                        {Company.name ? Company.name : Company.domain}
                      </Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            );
          })}
          <Link to="/profile" className="add-new">
            <Card className="h-100 item-company">
              <Card.Body className="align-items-center card-body d-flex justify-content-center">
                <Card.Title
                  className="text-center"
                >
                  <BsFillPlusCircleFill style={{ fontSize: 40 }} />
                </Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
              <div className="card-footer">
                Add new brand
              </div>
            </Card>
          </Link>
        </div>      
    </Container>
    </div>

  );
}

export default MyCompany;