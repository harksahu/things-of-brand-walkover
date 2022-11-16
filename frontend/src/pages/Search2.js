import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "../utils/svginline.css";
import { connect } from "react-redux";
import { searchBrand } from "../store/actions/search-brands";
import Figure from "react-bootstrap/Figure";
import SvgInline from "../utils/SvgInline.js";
import { getProfileDetails } from "../api/index.js";
import { async } from "@firebase/util";
import Pagination from "./Pagination";
import ReactPaginate from 'react-paginate';

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

function Home({ searchBrandData = [], getSearchBrand }) {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  // function Home() {
  // const [searchBrandData,setSearchBrandData] = useState()
  // const getProfile = async () =>{
  //   setSearchBrandData(await getProfileDetails({}));
  // }

  useEffect(() => {
    const fetchPosts = async () =>{
      setLoading(true);
      getSearchBrand({}); 
      setPosts(searchBrandData.data)
      setLoading(false);
    }
    
    fetchPosts();
  }, []);


  const indexOfLastPost = currentPage* postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchBrandData.data.slice(indexOfFirstPost,indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="p-3 flex bg-light">
      {/* {console.log(searchBrandData)} */}
      <div className="d-flex flex-wrap justify-content-center">
        {currentPosts?.data?.length === 0 ? (
          <Not_found />
        ) : (
          currentPosts?.map((Company) => {
            // console.log(brand);
            return (
              <div
                key={Company._id}
                className="d-flex justify-content-center item"
              >
                <Link to={"/" + Company.domain}>
                  <Card>
                    <div style={{ overflow: "auto" }} className="img_size">
                      <SvgInline url={Company.logo} />
                    </div>

                    <Card.Body>
                      <Card.Title
                        style={{ textDecoration: "none" }}
                        className="text-center"
                      >
                        {Company.name? Company.name :Company.domain}
                      </Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            );
          })
        )}
        {/* {console.log(posts.length)} */}
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts={searchBrandData.data.length} paginate={paginate} />
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

export default connect(mapStateToProp, mapDispatchToProp)(Home);

// export default Home;
