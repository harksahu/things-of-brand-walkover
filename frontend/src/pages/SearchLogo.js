import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "../utils/SvgInLine.css";
import { connect } from "react-redux";
import { searchBrand } from "../store/actions/Search-Brands.js";
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

function HomeLogo({ searchBrandData = [], getSearchBrand }) {
  useEffect(() => {
    getSearchBrand({ active: "1" });
  }, []);
  return (
    <div className="p-3 flex bg-light">
      <div className="d-flex flex-wrap justify-content-center">
        {searchBrandData?.data?.length === 0 ? (
          <Not_found />
        ) : (
          searchBrandData?.data?.map((brand) => {
            return (
              <div
                key={brand._id}
                className="d-flex justify-content-center item"
              >
                <Link to={"/Stuff/" + brand._id}>
                  <Card>
                    <div style={{ overflow: "auto" }} className="img-size">
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
                        {brand?.title}
                      </Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const mapStateToProp = (state, ownProps) => {
  return { ...ownProps, searchBrandData: state.searchBrandReducer };
};

const mapDispatchToProp = (dispatch) => {
  return {
    getSearchBrand: (payload) => dispatch(searchBrand(payload)),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(HomeLogo);
