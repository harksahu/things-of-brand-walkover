import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router-dom";

function SideBar({ getSearchBrand, clearSearchBrand, searchBrandData }) {  
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
    <Nav variant="pills flex-column">      
      <Nav.Item>
        <Nav.Link className={ location.pathname === '/addfile' ? 'active' : ''}
        onClick={() => {
          navigate("/addfile");
        }}
        >Upload file</Nav.Link>        
      </Nav.Item>

      <Nav.Item>
        <Nav.Link className={ location.pathname === '/mystuff' ? 'active' : ''}
        onClick={() => {
          navigate("/mystuff");
        }}
        >My Stuff</Nav.Link>
      </Nav.Item>
      
      <Nav.Item>
        <Nav.Link className={ location.pathname === '/mycompanies' || location.pathname === '/editprofile' ? 'active' : ''}
        onClick={() => {
          navigate("/mycompanies");
        }}
        >My Brands</Nav.Link>
      </Nav.Item>      

      <Nav.Item>
        <Nav.Link
        onClick={() => {
          navigate("/allcompanies");
        }}
        >Explore other brands</Nav.Link>
      </Nav.Item>      

      <Nav.Item>
        <Nav.Link className={ location.pathname === '/account' ? 'active' : ''}
        onClick={() => {
          navigate("/account");
        }}
        >User Profile</Nav.Link>
      </Nav.Item>
            
      <Nav.Item>
        <Nav.Link
  href="https://thingsofbrand.canny.io/feature-requests"
        >Feature Requests</Nav.Link>
      </Nav.Item>

    </Nav>      
    </>
  );
}

export default SideBar;
//export default connect(mapStateToProp, mapDispatchToProp)(SideBar);
