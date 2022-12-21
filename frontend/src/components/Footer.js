import React from "react";
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
          target="_blank" rel="noreferrer"
        >
          <strong>Feature request</strong>
        </a>

        <div>
          <span className="me-2">Product by</span> 
          <a href="https://walkover.in/" target="_blank" className="me-3" rel="noreferrer">
            WALKOVER
          </a>
        </div>
      </Container>  
    </footer>      
  );
}
export default Footer;
