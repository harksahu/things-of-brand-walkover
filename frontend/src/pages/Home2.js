import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../utils/svginline.css";
import "./home.scss";
import { UserAuth } from "../context/AuthContext";

function Home2() {
  const { logOut } = UserAuth();
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  // console.log(searchBrandData)
  const handleGoogleSignIn = async () => {
    try {
      if (user) {
        navigate("/MyStuff");
      } else {
        await googleSignIn();
      }

      // console.log(object);
    } catch (error) {
      console.log(error);
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
                className={`btn btn-lg ${user ? 'btn-outline-primary' : 'btn-primary'}`}
                onClick={handleGoogleSignIn}
              >
                {user ? 'Manage' : 'Get started'}
              </button>
            </div>
          </Col>
        </Row>
        <div className="mt-5"></div>
        <Row className="mt-5">
          <Col xs={12} lg={10} className="mx-auto text-center">
            <div className="fw-bold text-black-50">They manage their brand here</div>
            <div className="d-flex brands-wrp align-items-center justify-content-center flex-wrap">
              <div>
                <img src="walkover.svg" />
              </div>
              <div>
                <img src="msg91.svg" />
              </div>
              <div>
                <img src="giddh.svg" />
              </div>
              <div>
                <img src="halfkg.svg" />
              </div>
              <div>
                <img src="socket.svg" />
              </div>
              <div>
                <img src="workspace.svg" />
              </div>
            </div>
            <Link to="/search">
              Explore more...
            </Link>
          </Col>
        </Row>
        <div className="flex-fill"></div>
        <footer className="footer mt-auto small text-center">
          © 2022 <strong>Things of brand</strong> by{" "}
          <a href="https://walkover.in/" target="">
            WALKOVER
          </a>
          , All rights reserved.
        </footer>
      </Container>
    </>
  );
}

export default Home2;

// export default Home