import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../utils/SvgInLine.css";
import "../scss/home.scss";
import { UserAuth } from "../context/AuthContext";
 
function Home() {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      if (user) {
        navigate("/my-companies");
      } else {
        await googleSignIn();
      }
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <>
      <Container className="h-100 d-flex flex-column h-100">
        <div className="mt-5"></div>
        <Row className="mt-5">
          <Col xs={12} md={8} lg={6} className="mx-auto text-center">
            <h1 className="display-4 heading">
              <span className="w">W</span>here are your brand guidelines
              <span className="q">?</span>
            </h1>
            <p className="mt-4">
              Collect all your <strong>brand things</strong> under one station
              and providing you the capability to manage every little thing from
              one place .
            </p>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className={`btn btn-lg ${
                  user ? "btn-outline-primary" : "btn-primary"
                }`}
                onClick={handleGoogleSignIn}
              >
                {user ? "Manage" : "Get started"}
              </button>
            </div>
          </Col>
        </Row>
        <div className="mt-5"></div>
        <Row className="mt-5">
          <Col xs={12} lg={10} className="mx-auto text-center">
            <div className="fw-bold text-black-50">
              They manage their brand here
            </div>
            <div className="d-flex brands-wrp align-items-center justify-content-center flex-wrap">
              <Link  to="/walkover.in" target="_blank">
                <img src="walkover.svg" />
              </Link >
              
              <Link  to="/msg91.com"target="_blank">
                <img src="msg91.svg" />
              </Link >
              
              <Link  to="/giddh.com"target="_blank">
                <img src="giddh.svg" />
              </Link >
              
              <Link  to="/halfkg.store"target="_blank">
                <img src="halfkg.svg" />
              </Link >
              
              <Link  to="/viasocket.com"target="_blank">
                <img src="socket.svg" />
              </Link >
              
              <Link  to="/workspace91.com"target="_blank">
                <img src="workspace.svg" />
              </Link >
            </div>
            <Link to="/all-companies">Explore more...</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;

