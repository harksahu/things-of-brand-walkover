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
        <Nav.Link className={ location.pathname === '/MyStuff' ? 'active' : ''}
        onClick={() => {
          navigate("/MyStuff");
        }}
        >My Stuff</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link className={ location.pathname === '/account' ? 'active' : ''}
        onClick={() => {
          navigate("/account");
        }}
        href="/account">Account</Nav.Link>
      </Nav.Item>      
      
      <Nav.Item>
        <Nav.Link className={ location.pathname === '/company' || location.pathname === '/profile' ? 'active' : ''}
        onClick={() => {
          navigate("/company");
        }}
        href="/company">Company</Nav.Link>
      </Nav.Item>      
    </Nav>      
    </>
  );
}

export default SideBar;
//export default connect(mapStateToProp, mapDispatchToProp)(SideBar);
