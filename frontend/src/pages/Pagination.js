import React, { useEffect } from "react";
import { useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const [index, setIndex] = useState(0);
  const [temp, setTemp] = useState(1);

  const pageNumbers = [];
  useEffect(() => {}, [index]);
  const handlePrevious = () => {
    if (index > 0) {
      document.getElementById("next").style.display = "block";
      document.getElementById("previous").style.display = "block";
      console.log("entered", index);
      paginate(pageNumbers[index - 1]);
      setIndex(index - 1);
      if (index - 1 === 0) {
        document.getElementById("previous").style.display = "none";
        
      }
    }
  };
  const handleNext = () => {
    if (index < pageNumbers.length - 1) {
      console.log("pagiate to = ", index + 1);
      paginate(pageNumbers[index + 1]);
      document.getElementById("next").style.display = "block";
      document.getElementById("previous").style.display = "block";
    }
    if (index !== pageNumbers.length - 1) {
      console.log("index seted = ", index + 1);
      setIndex(index + 1);
      if (index + 1 === pageNumbers.length - 1)
        document.getElementById("next").style.display = "none";
    }
  };
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        <div className="m-auto d-flex">
          <div
            id="previous"
            style={{ display: "flex", marginRight: 7, display: "none" }}
            onClick={() => handlePrevious()}
          >
            <BsFillArrowLeftCircleFill style={{ fontSize: 27 }} />{" "}
          </div>
          <div
            id="next"
            style={{ display: "flex" }}
            onClick={() => handleNext()}
          >
            <BsFillArrowRightCircleFill style={{ fontSize: 27 }} />
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default Pagination;
