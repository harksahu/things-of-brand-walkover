import React from "react";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { GoogleButton } from "react-google-button";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from 'react-bootstrap/Form';

function BasicExample() {
  // const { logOut } = UserAuth();
  // const { googleSignIn, user } = UserAuth();
  // const navigate = useNavigate();

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await googleSignIn();
  //     // console.log(object);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSignOut = async () => {
  //   try {
  //     await logOut();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container className="mb-3" fill>
          <Navbar.Brand href="#home" className="bo">Things of Brand</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav
            className="m-auto my-2"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Form className="justify-content-center">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            </Form>
            <NavDropdown title="My stuff" id="collasible-nav-dropdown" className="">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}

export default BasicExample;
