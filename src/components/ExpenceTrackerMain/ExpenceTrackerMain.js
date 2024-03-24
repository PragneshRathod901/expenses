import React from "react";
import "./ExpenceTrackerMain.css";

const CardWithHeader = ({ header, content }) => {
  return (
    <div className="card">
      <div className="heading">{header}</div>
      <div className={"cardContent "}>{content}</div>
    </div>
  );
};

export default CardWithHeader;
