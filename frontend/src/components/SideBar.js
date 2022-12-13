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
        <Nav.Link className={ location.pathname === '/my-stuff' ? 'active' : ''}
        onClick={() => {
          navigate("/my-stuff");
        }}
        >My Stuff</Nav.Link>
      </Nav.Item>
      
      <Nav.Item>
        <Nav.Link className={ location.pathname === '/my-companies' || location.pathname === '/editprofile' ? 'active' : ''}
        onClick={() => {
          navigate("/my-companies");
        }}
        >My Brands</Nav.Link>
      </Nav.Item>      

      <Nav.Item>
        <Nav.Link
        onClick={() => {
          navigate("/all-companies");
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
