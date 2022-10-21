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
    <div className="m-5">
      <div><h1>thingsofbrand</h1></div>
      <div>Lorem ipsum dolor sit amet consec expedita optio esse fugit aliquid ullam, tenetur, voluptate quia ad nobis vel nesciunt.</div><br/>
      <div><a href="http://thingsofbrand.com" target="_blank" rel="noopener noreferrer">thingsofbrand.com</a></div><br/>
      <div>Guidelines
        <p><a  target="_blank" rel="noopener noreferrer"> How to create ads</a></p>
        <p><a  target="_blank" rel="noopener noreferrer"> How to use fonts</a></p>
      </div>
      <div><h5>Logos</h5>
      
      
      </div>
      <div><h5>Colors</h5>
      <div className="d-flex">
      <div id="primary" style={{width: 50 , height: 50 , backgroundColor : "black" , margin: 5}}></div>
      <div id="secondary" style={{width: 50 , height: 50 , backgroundColor : "black" , margin: 5}}></div>
      </div>
      
      </div>
      <div><h5>Fonts Size</h5>
      <div style={{fontFamily: '"Times New Roman", Times, serif'}}>"Times New Roman", Times, serif</div>
      </div>
<br />
      <div><h5>background Colors</h5>
      <div className="d-flex">
      <div id="secondary" style={{width: 50 , height: 50 , backgroundColor : "black" , margin: 5}}></div>
      </div>
      </div>
    </div>
  );
}

export default Brand;


