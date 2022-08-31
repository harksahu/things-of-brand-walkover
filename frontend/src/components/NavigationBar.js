import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { GoogleButton } from "react-google-button";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";

const NavigationBar = (props) => {
  const { logOut } = UserAuth();
  const { googleSignIn, user } = UserAuth();
  // const navigate = useNavigate();
console.log(props.user);
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      // console.log(object);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" >
        <Container className="mb-3" fill>
          <Navbar.Brand href="/" className="bo">Things of Brand</Navbar.Brand>
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
            
            </Nav>
            {/* <img
            className="w-8 h-8 rounded-full"
            src={user?.photoURL}
            alt={user?.displayName}
          /> */}
          {user?.displayName ? (
            <NavDropdown title={user?.displayName} id="collasible-nav-dropdown" className=""  style={{alignItems:'end'}}>
              <NavDropdown.Item href="/account">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/addfile">
                Upload File
              </NavDropdown.Item>
              <NavDropdown.Item href="/MyStuff">My Stuff</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSignOut} >
              logout
              </NavDropdown.Item>
            </NavDropdown>

          ):(
                <div>
              <div>
                <GoogleButton onClick={handleGoogleSignIn} />
              </div>
            </div>
              )}
            </Navbar.Collapse>
        </Container>
      </Navbar>

    </>



  );
};

export default NavigationBar;








{/* <div className='flex justify-between bg-gray-200 w-full p-4 ' >

  <h1 className='text-center text-2xl font-bold'>
    Things of Brand
  </h1>

  <div className="d-flex form-inputs">
    <input className="form-control" type="text" placeholder="Search any product..."/>
    <i className="bx bx-search"></i>
    </div>

  {user?.displayName ? (
    <div>

    <Link to="/addfile" className='btn btn-success'>add</Link>
      <button onClick={handleSignOut} className='btn btn-danger'>Sign Out </button>
      {/* <img
            className="w-8 h-8 rounded-full"
            src={user?.photoURL}
            alt={user?.displayName}
          /> */}

        //   </div>

        //   ) : (
        //     <div>
        //   <div>
        //     <GoogleButton onClick={handleGoogleSignIn} />
        //   </div>
        // </div>
        //   )}
        // </div> */}