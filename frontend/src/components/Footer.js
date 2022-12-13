import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  Container,  
} from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container className="d-flex small justify-content-between">
        <div>
          <img src="tob-icon.svg" id="footer-icon" className="me-2" /> 
          <strong className="me-2">Things of brand</strong>
          © 2022 All rights reserved.
        </div>
        <a
          href="https://feature.thingsofbrand.com/feature-requests"
          target="_blank"
        >
          <strong>Feature request</strong>
        </a>

        <div>
          <span className="me-2">Product by</span> 
          <a href="https://walkover.in/" target="_blank" className="me-3">
            WALKOVER
          </a>
        </div>
      </Container>  
    </footer>      
  );
}
export default Footer;
