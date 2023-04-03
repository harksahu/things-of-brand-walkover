import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { searchBrand, clearSearchBrand } from "../store/actions/Search-Brands.js";
import { connect } from "react-redux";
import { getProfileDetails, sendSearchAPI } from "../api/Index.js";
import "../scss/style.scss";
import "../scss/navbar.scss";

function NavigationBar({ getSearchBrand }) {
  const { logOut } = UserAuth();
  const { googleSignIn, user, isLoading } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();



  const handleKeyPress = useCallback((event) => {
    // console.log(event);
    // if (window.navigator.platform === "MacIntel") {
    if (event.ctrlKey === true) {
      if (event.key === "k") {
        document.getElementById("searchbar").focus()
      }
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);


  const searchbar = async (searchData) => {
    await getProfileDetails({
      email: "",
      domain: searchData,
      name: searchData,
      searchfrom: "false",
    });

    await sendSearchAPI({
      title: searchData,
      email: "",
      active: 1,
      description: "",
      _id: "",
      domain: "",
    });

  };

  const [searchItem, setItems] = useState();

  const sendData = async (text) => {
    text = text.trimStart();
    setItems(text);
    if (text === "") {
      setItems(null);

      if (location.pathname === "/my-stuff") {
        await getSearchBrand({
          title: "",
          email: user.email,
          active: "",
          description: "",
        });
      } else {
        await getSearchBrand({ title: "", active: "1" });
      }
    } else {
      if (location.pathname === "/my-stuff") {
        if (user.email) {
          await getSearchBrand({
            title: text,
            email: user.email,
            active: "",
            description: text,
          });
        }
      } else {
        getSearchBrand({
          name: text,
          domain: text,
        });
      }
    }
  };

  const loginAndForward = () => {
    handleGoogleSignIn();
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/my-companies");
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      // console.log(error);
    }
  };
  
  return (
    <>
      <Navbar expand="lg" sticky="top" className="bg-light">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate(user?.displayName ? "/my-companies" : '/');
            }}
            id="logo"
            style={{ cursor: "pointer" }}
          >
            <img src="/tob-logo.svg" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="m-auto my-2"
              id="search-box"
              style={{ maxHeight: "100px" }}
              navbarScroll              
            >
              {!user && location.pathname === "/all-companies" ? (
                <Form className="justify-content-center">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    id="searchbar"
                    autoComplete="off"
                    aria-label="Search"
                    // show={true}
                    onChange={(e) => {
                      {
                        sendData(e.target.value);
                        searchbar(e.target.value);
                      }
                    }}
                    value={searchItem || ""}
                    list="browsers"
                    name="myBrowser"
                  />

                </Form>
              ) : (
                ""
              )}
            </Nav>            

            {user?.displayName ? (
              <Nav className="tob-navbar" defaultActiveKey="/">
                {location.pathname === "/all-companies" && (
                  <Form className="justify-content-center">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      id="searchbar"
                      autoComplete="off"
                      aria-label="Search"
                      // show={true}
                      onChange={(e) => {
                        {
                          sendData(e.target.value);
                          searchbar(e.target.value);
                        }
                      }}
                      value={searchItem || ""}
                      list="browsers"
                      name="myBrowser"
                    />
                  </Form>
                )
                }
                <Nav.Link eventKey="link-2" href="#" className={location.pathname.includes("/my-companies") ? "active":""} onClick={() => { navigate("/my-companies"); }}>My Brands</Nav.Link>
                <Nav.Link eventKey="link-3" href="#" className={location.pathname.includes("/collection") ? "active":""} onClick={() => { navigate("/collection"); }}>Collections</Nav.Link>
                <Nav.Link eventKey="link-4" href="#" className={location.pathname.includes("/all-companies") ? "active":""} onClick={() => { navigate("/all-companies"); }}>Explore</Nav.Link>
                <NavDropdown
                  title={user?.displayName}
                  id="collasible-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/account");
                    }}
                  >
                    User Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item
                    href="https://thingsofbrand.canny.io/feature-requests"
                    target="_blank"
                  >
                    Feature Requests
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={handleSignOut}>
                    logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              !isLoading && (
              <>
                {(location.pathname === "/") ? ("") : (
                  <Nav.Link eventKey="link-1" href="#" className={location.pathname === "/"  ? "active me-3" : "me-3"}  onClick={() => { navigate("/"); }}>Home</Nav.Link>
                )}
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    loginAndForward();
                  }}
                >
                  Get started
                </button>
              </>
              )
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

const mapStateToProp = (state, ownProps) => {
  return { ...ownProps, searchBrandData: state.searchBrandReducer };
};
const mapDispatchToProp = (dispatch) => {
  return {
    getSearchBrand: (payload) => dispatch(searchBrand(payload)),
    clearSearchBrand: () => dispatch(clearSearchBrand()),
  };
};
export default connect(mapStateToProp, mapDispatchToProp)(NavigationBar);
