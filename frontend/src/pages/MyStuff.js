import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Card, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../utils/SvgInLine.css";
import { sendSearchAPI } from "../api/Index.js";
import ClipLoader from "react-spinners/ClipLoader";


import Figure from "react-bootstrap/Figure";

function Not_found() {
  return (
    <Figure className="text-center flex justify-cont">
      <Figure.Image
        width={500}
        height={500}
        alt="171x180"
        src="https://i.pinimg.com/564x/f4/e0/d9/f4e0d998d00d96269eeb30c8c625031b.jpg"
      />
      <Figure.Caption>Data not found</Figure.Caption>
    </Figure>
  );
}

// function Home({ searchBrandData = [], getSearchBrand }) {
function Home() {
  const { user } = UserAuth();
  const [searchBrandData, setSearchBrandData] = useState();
  const [loading, setLoading] = useState(false);

  const getbrand = async () => {
    const data = await sendSearchAPI({
      email: user.email,
      active: "",
    });
    setSearchBrandData(data?.data);
  };

  useEffect(() => {
    setLoading(true);

    if (
      user !== null &&
      user !== undefined &&
      user &&
      Object.keys(user).length > 0
    ) {
      // getSearchBrand({
      //   email: user.email,
      //   active: "",
      // })
      getbrand();
      setLoading(false);
    }

  }, [user]);

  return (
    <>
      {loading ?
       <div className="center-loader"><ClipLoader /></div> :
        <Container className="wrpr">
          <Link to={"/addfile"}>
            <Button variant="dark">Add Stuff</Button>
          </Link>
          <Row md={4} className="g-4 flex p-3">
            {searchBrandData?.data?.length === 0 ? (
              <Not_found />
            ) : (
              searchBrandData?.data?.map((brand) => {
                return (
                  <div key={brand._id}>
                    {brand.active === true ? (
                      <div
                        key={brand._id}
                        className="d-flex justify-content-center item"
                      >
                        <Link to={"/stuff/" + brand._id}>
                          <Card>
                            <div
                              style={{ overflow: "auto" }}
                              className="img-size"
                            >
                              {

                                brand.url !== undefined && brand.url !== "null"
                                  ? <img src={brand.url} alt="" />
                                  : <img src="/assets/picture.svg" alt="" />

                              }
                            </div>

                            <Card.Body>
                              <Card.Title
                                style={{ textDecoration: "none" }}
                                className="text-center"
                              >
                                {brand.title}
                              </Card.Title>
                              <Card.Text></Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      </div>
                    ) : null}
                  </div>
                );
              })
            )}
          </Row>
          <h5 className="text-center">Deleted Items</h5>
          <Row md={4} className="g-4 flex p-3">
            {searchBrandData?.data?.length === 0 ? (
              <Not_found />
            ) : (
              searchBrandData?.data?.map((brand) => {
                return (
                  <div key={brand._id}>
                    {brand.active === false ? (
                      <div
                        key={brand._id}
                        className="d-flex justify-content-center item"
                      >
                        <Link to={"/stuff/" + brand._id}>
                          <Card>
                            <div
                              style={{ overflow: "auto" }}
                              className="img-size"
                            >
                              {

                                brand.url !== undefined && brand.url !== "null"
                                  ? <img src={brand.url} alt="" />
                                  : <img src="/assets/picture.svg" alt="" />

                              }
                            </div>

                            <Card.Body>
                              <Card.Title
                                style={{ textDecoration: "none" }}
                                className="text-center"
                              >
                                {brand.title}
                              </Card.Title>
                              <Card.Text></Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      </div>
                    ) : null}
                  </div>
                );
              })
            )}
          </Row>
        </Container>
      }
    </>
  );
}

// const mapStateToProp = (state, ownProps) => {
//   return { ...ownProps, searchBrandData: state.searchBrandReducer };
// };

// const mapDispatchToProp = (dispatch) => {
//   return {
//     getSearchBrand: (payload) => dispatch(searchBrand(payload)),
//   };
// };

// export default connect(mapStateToProp, mapDispatchToProp)(Home);
export default Home;
