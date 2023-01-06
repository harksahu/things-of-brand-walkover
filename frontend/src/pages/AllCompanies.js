import React, { useEffect, useState } from "react";
import "../utils/SvgInLine.css";
import { connect } from "react-redux";
import { searchBrand } from "../store/actions/Search-Brands.js";
import Figure from "react-bootstrap/Figure";
import Pagination from "../components/Pagination";
import ClipLoader from "react-spinners/ClipLoader";
import CompanyCard from "../components/CompanyCard.js"

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

function Home({ searchBrandData = [], getSearchBrand ,loading}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(16);

  // function Home() {
  // const [searchBrandData,setSearchBrandData] = useState()
  // const getProfile = async () =>{
  //   setSearchBrandData(await getProfileDetails({}));
  // }
  const fetchPosts = () => {

    getSearchBrand({});



  };
  
  useEffect(() => {
    const fetchPosts1 = () => {
      fetchPosts();
    }
    fetchPosts1();

  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchBrandData.data.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="py-4 flex bg-light flex-fill">
      {loading ?
        <div className="center-loader"
        ><ClipLoader /> </div> :
        <>
          <div className="d-flex flex-wrap grid container">
            {currentPosts?.data?.length === 0 ? (
              <Not_found />
            ) : (
              currentPosts?.map((Company) => {
                return (
                  <div key={Company._id}>
                    <CompanyCard props={Company} />
                  </div>
                );
              })
            )}
          </div>
          <div className="mt-5"></div>
          {searchBrandData?.data?.length > postsPerPage && <Pagination
            postsPerPage={postsPerPage}
            totalPosts={searchBrandData.data.length}
            paginate={paginate}
          /> }
        </>
      }
    </div>
  );
}

const mapStateToProp = (state, ownProps) => {
  return { ...ownProps, searchBrandData: state.searchBrandReducer,loading:state.searchBrandReducer.isLoading };
};

const mapDispatchToProp = (dispatch) => {
  return {
    getSearchBrand: (payload) => dispatch(searchBrand(payload)),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Home);

// export default Home;
