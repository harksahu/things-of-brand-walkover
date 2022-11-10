import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Container, Row, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { searchBrand, clearSearchBrand } from "../store/actions/search-brands";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { getProfileDetails, sendSearchAPI } from "../api/index.js"
import { BsArrowReturnRight } from "react-icons/bs";


function NavigationBar({ getSearchBrand, clearSearchBrand, searchBrandData }) {
  const { logOut } = UserAuth();
  const { googleSignIn, user } = UserAuth();
  const [CompanyData, setCompanydata] = useState([]);
  const [LogoData, setLogoData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();


  const searchbar = async (searchData) => {

    // console.log(searchData);
    const C_data = await getProfileDetails({ email: "", domain: searchData, name: searchData, searchfrom: "false" })
    // console.log(C_data?.data?.data);
    // console.log(searchBrandData?.data);
    const array_data = C_data?.data?.data
    setCompanydata(array_data)
    // console.log(searchData);
    const L_data = await sendSearchAPI({ title: searchData, email: "", active: 1, description: "", _id: "", domain: "" })
    // console.log(L_data?.data?.data);
    // console.log(searchBrandData?.data);
    const array_logo_data = L_data?.data?.data
    setLogoData(array_logo_data)
  }


  const [searchItem, setItems] = useState();

  const sendData = async (text) => {
    // console.log(location.pathname);
    text = text.trimStart();
    setItems(text);
    if (text === "") {
      setItems(null);
      console.log(location.pathname === "/MyStuff");
      if (location.pathname === "/MyStuff") {
        console.log("first")
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
      // getSearchBrand({title:text});
      if (location.pathname === "/MyStuff") {
        console.log("Sec");
        if (user.email) {
          console.log(user.email);
          await getSearchBrand({
            title: text,
            email: user.email,
            active: "",
            description: text,
          });
        }
      } else {
        getSearchBrand({
          // title: text,
          // email: "",
          // active: "1",
          // description: text,
          // _id: "",
          name: text,
          domain: text,
        });
      }
    }
  };













  var numbers = [1, 2, 3, 4, 5];
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
      // console.log(object);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar expand="lg bg-white" sticky="top">
        <Container fluid >
          <Navbar.Brand
            onClick={() => {
              navigate("/home");
            }}
            className="bo"
          >
            Things of Brand
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="m-auto my-2"
              id="search-box"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {
                location.pathname === "/search" ?
                  <Form className="justify-content-center">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      id="searchbar"
                      aria-label="Search"
                      show={true}
                      onChange={(e) => {
                        {
                          sendData(e.target.value)
                          searchbar(e.target.value)

                        }
                      }}
                      value={searchItem || ""}
                      list="browsers"
                      name="myBrowser"
                    />
                    {document.getElementById("searchbar")?.value === "" ? "" : <div >


                      <Card style={{fontWeight : "bold"}} >
                        Company:-
                        {/* {console.log(brandData.name)} */}

                      </Card>
                      {/* {console.log(CompanyData)} */}
                      {CompanyData && CompanyData?.map((brandData) => (
                        <div id="myBrowser" key={brandData._id}>
                          {document.getElementById("searchbar")?.value === "" ? "" :
                            (
                              <Link to={"/" + brandData.domain}>

                                <div style={{color: "black" , textDecoration:"none" , backgroundColor:"white"}}>
                                  {brandData.name}
                                  <BsArrowReturnRight style={{float:"right"}}/>
                                  {/* {console.log(brandData.name)} */}

                                </div>
                              </Link>
                            )
                          }


                        </div>
                      ))}
                      <Card style={{fontWeight : "bold"}} >
                        Logos:-
                        {/* {console.log(brandData.name)} */}

                      </Card>
                      {/* {console.log(LogoData)} */}
                      {LogoData && LogoData?.map((brandData) => (
                        <div id="myBrowser" key={brandData._id}>
                          {document.getElementById("searchbar")?.value === "" ? "" :
                            (
                              <Link to={"/stuff/" + brandData._id}>

                                <div style={{color: "black" , textDecoration:"none" , backgroundColor:"white"}}>
                                  {brandData.title}
                                  <BsArrowReturnRight style={{float:"right"}}/>
                                  {/* {console.log(brandData.name)} */}

                                </div>
                              </Link>

                            )
                          }


                        </div>
                      ))}
                    </div>
                    }
                  </Form>
                  : ""
              }
            </Nav>

            {user?.displayName ? (
              <NavDropdown
                title={user?.displayName}
                id="collasible-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/addfile");
                  }}
                >
                  Upload File
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/MyStuff");
                  }}
                >
                  My Stuff
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => {
                    navigate("/company");
                  }}
                >
                  Brands
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  User Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item
                  onClick={() => {
                    navigate("/search");
                  }}
                >
                  Explore
                </NavDropdown.Item>
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
            ) : (
              <button type="button" className="btn btn-outline-primary" onClick={handleGoogleSignIn}>Get started</button>
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
