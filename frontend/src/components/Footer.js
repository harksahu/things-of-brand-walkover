import React from "react";
import {
  Container,  
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Footer() {
   const location= useLocation();
  return (
    <>
   {
    location?.pathname?.includes(".") ? 
    (<footer className="footer bg-light">
      <Container className="d-flex small justify-content-end">
      Powered By<Link to = "/" target="_blank" className="ms-2">Things Of Brand</Link>
      </Container>  
      </footer>)
    :
   ( <footer className="footer bg-light">
      <Container className="d-flex small justify-content-between">
        <div>
          <img src="/tob-icon.svg" id="footer-icon" className="me-2" /> 
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
    </footer> )
   }  
   </>   
  );
}
export default Footer;
