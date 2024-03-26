import React from "react";
import "./TransactionItemCard.css";
import {
  IoMdPizza,
  IoMdGift,
  IoMdCloseCircleOutline,
  IoMdBus,
} from "react-icons/io";
import { BiPencil } from "react-icons/bi";
const getIconByCategory = (name) => {
  switch (name) {
    case "Food":
      return <IoMdPizza />;
    case "Entertainment":
      return <IoMdGift />;
    case "Travel":
      return <IoMdBus />;
    default:
      return <IoMdBus />;
  }
};
const TransactionItemCard = ({ data }) => {
  const onClickEdit = (e) => {
    e.stopPropagation();
    console.log(data);
  };
  const onClickRemove = (e) => {
    e.stopPropagation();
    console.log(data);
  };
  return (
    <div className="flex spaceBetween itemDescription">
      <div className="flex c-gap">
        <div className="catIcon">{getIconByCategory(data.category)}</div>
        <div className="flex f-column itemTitle">
          <h4>{data.title}</h4>
          <p>{new Date(data.date).toLocaleDateString("en-US")}</p>
        </div>
      </div>
      <div className="flex justifyContentCentre alignItemCentre c-gap">
        <div className="item-amount">₹ {data.amount}</div>
        <button className="deleteBtn cardShadow" onClick={onClickRemove}>
          <IoMdCloseCircleOutline />
        </button>
        <button className="editBtn cardShadow" onClick={onClickEdit}>
          <BiPencil />
        </button>
      </div>
    </div>
  );
};

export default TransactionItemCard;
