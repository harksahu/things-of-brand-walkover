import React, { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../utils/svginline.css";
import "./home.css";
import { UserAuth } from "../context/AuthContext";

function Brand() {
  const title = useParams();
  console.log(title.title);



  return (
    <>
      <div><h1>thingsofbrand</h1></div>
      <div>Lorem ipsum dolor sit amet consec expedita optio esse fugit aliquid ullam, tenetur, voluptate quia ad nobis vel nesciunt.</div><br/>
      <div><a href="http://thingsofbrand.com" target="_blank" rel="noopener noreferrer">thingsofbrand.com</a></div><br/>
      <div>Guidelines
        <p><a  target="_blank" rel="noopener noreferrer"> How to create ads</a></p>
        <p><a  target="_blank" rel="noopener noreferrer"> How to use fonts</a></p>
      </div>
      <div><h5>Logos</h5>
      
      
      </div>
      <div><h5>Colors</h5></div>
      <div><h5>Fonts</h5></div>

    </>
  );
}

export default Brand;


