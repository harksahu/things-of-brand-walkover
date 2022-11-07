import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../utils/svginline.css";
import "./home.scss";
import { UserAuth } from "../context/AuthContext";
import Home2 from "./Home2";

function Home() {
  const { logOut } = UserAuth();
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log(user);
      navigate("/company");
    }
  }, [user]);
  return (
    <>
      <Home2 />
    </>
  );
}

export default Home;

// export default Home
