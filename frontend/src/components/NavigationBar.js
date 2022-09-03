import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { GoogleButton } from "react-google-button";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import { sendSearchAPI } from "../api";

const NavigationBar = (props) => {
  const { logOut } = UserAuth();
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate()
  const[ listOfbrands , setListOfBrands] = useState([])

  const [searchItem, setItems] = useState();

const sendData =async(text)=>{
  text = text.trimStart();
  setItems(text)
  if (text === "") {
    setItems(null)
  } else {

    console.log(text)
  setListOfBrands((await sendSearchAPI(text))?.data?.data)
  console.log(listOfbrands)
  }

  // <Link to={{ 
  //   pathname: "/search", 
  //   state: listOfbrands
  //  }}/>
  
}




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
      <Navbar bg="light" expand="lg" sticky="top">
        <Container className="mb-3" fill>
          <Navbar.Brand onClick={()=>{navigate("/") }} className="bo">Things of Brand</Navbar.Brand>
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
              onChange={(e) => {sendData(e.target.value)}}
              value={searchItem}

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
              <NavDropdown.Item onClick={()=>{navigate("/addfile") }}>
                Upload File
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{navigate("/MyStuff") }}>My Stuff</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{navigate("/account") }}>Profile</NavDropdown.Item>
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




