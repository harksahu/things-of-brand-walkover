import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { getProfileDetails } from "../api/index.js";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import SvgInline from "../utils/SvgInline.js";
import "../utils/svginline.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SideBar from '../components/SideBar';

function MyCompany() {
  const [company, setCompany] = useState();
  const { user } = UserAuth();
  const navigate = useNavigate();
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

    // console.log(fresult.data.data);
    if (Array.isArray(fresult.data.data) && fresult.data.data.length) {
      // console.log("efsad");
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
    <Container fluid className="wrpr" >
      <Row>        
        <Col md={3} lg={2}>
          <SideBar/>
        </Col>
        <Col md={9} lg={10}>
          <Link to="/profile">
            <AiFillPlusCircle style={{ float: "right", fontSize: 40 }} />
          </Link>
          <Row md={4} className="g-4 flex p-3 bg-light">
            {company?.map((Company) => {
              return (
                <div
                  key={Company._id}
                  className="d-flex justify-content-center item"
                >
                  {/* <Link to={"/profile" }state={{ data: Company }}> */}
                  <Link to={'/'+Company.domain}>
                    <Card>
                      <div style={{ overflow: "auto" }} className="img_size">
                        <SvgInline url={Company.logo} />
                      </div>
                      <Card.Body>
                        <Card.Title
                          style={{ textDecoration: "none" }}
                          className="text-center"
                        >
                          {Company.name?Company.name:Company.domain}
                        </Card.Title>
                        <Card.Text></Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </Row>
        </Col>      
      </Row>
    </Container>
    </>
  );
}

export default MyCompany;