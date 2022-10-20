import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../utils/svginline.css";
import "./home.css";
import { UserAuth } from "../context/AuthContext";

function Home() {
  return (
    <>
      <Container className="h-100 d-flex flex-column h-100">
        <div className="mt-5"></div>
        <Row className="mt-5">
          <Col xs={12} md={8} lg={6} className="mx-auto text-center">
            <h1 className="display-4 heading">Brand Name</h1>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate facere culpa ipsam earum doloribus quibusdam assumenda
              expedita nihil laboriosam eaque!
            </p>
            <div className="d-flex justify-content-center"></div>
          </Col>
        </Row>
        <div className="mt-5"></div>
        <Row className="mt-5">
          <Col xs={12} lg={10} className="mx-auto text-center">
            <div className="fw-bold text-black-50">They manage their brand</div>
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
            <Link to="/search" className="text-black-50">
              more...
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

export default Home;

// export default Home
