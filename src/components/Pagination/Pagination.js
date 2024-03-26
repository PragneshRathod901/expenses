import React from "react";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import "./Pagination.css";

const Pagination = ({ pageNo, maxPageNo, setPageNo }) => {
  const incrementPageNo = (e) => {
    if (pageNo + 1 >= maxPageNo) {
      return;
    }
    pageNo++;

    setPageNo(pageNo);
  };
  const decrementPageNo = (e) => {
    if (pageNo - 1 < 0) {
      return;
    }
    pageNo--;

    setPageNo(pageNo);
  };
  return (
    <div className="pagination">
      <button className="cardShadow" onClick={decrementPageNo}>
        <IoMdArrowBack />
      </button>
      <div>{pageNo + 1}</div>
      <button className="cardShadow" onClick={incrementPageNo}>
        <IoMdArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
