import React from "react";

const PieChartLabel = ({ labelClass, labelName }) => {
  return (
    <div className="pieLabel ">
      <div className={labelClass}></div>
      <div>{labelName}</div>
    </div>
  );
};

export default PieChartLabel;
