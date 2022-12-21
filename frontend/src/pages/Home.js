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
              <a href="/walkover.in">
                <img src="walkover.svg" />
              </a>
              
              <a href="/msg91.com">
                <img src="msg91.svg" />
              </a>
              
              <a href="/giddh.com">
                <img src="giddh.svg" />
              </a>
              
              <a href="/halfkg.store">
                <img src="halfkg.svg" />
              </a>
              
              <a href="/viasocket.com">
                <img src="socket.svg" />
              </a>
              
              <a href="/workspace91.com">
                <img src="workspace.svg" />
              </a>
            </div>
            <Link to="/all-companies">Explore more...</Link>
          </Col>
        </Row>
      </Container>
      <div className="flex-fill"></div>        
    </>
  );
}

export default Home;

