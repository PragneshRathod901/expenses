import React from "react";
import "./TransactionItemCard.css";
import {
  IoMdPizza,
  IoMdGift,
  IoMdCloseCircleOutline,
  IoMdBus,
} from "react-icons/io";
import { BiPencil } from "react-icons/bi";
import { ToggleEditWindow } from "../../features/ExpenseWindowSlice";
import { DeleteExpense } from "../../features/ExpenseSlice";
import { useDispatch } from "react-redux";

const getIconByCategory = (name) => {
  switch (name) {
    case "food":
      return <IoMdPizza />;
    case "entertainment":
      return <IoMdGift />;
    case "travel":
      return <IoMdBus />;
    default:
      return "";
  }
};
const TransactionItemCard = ({ data }) => {
  const dispatch = useDispatch();
  const onClickEdit = (e) => {
    e.stopPropagation();
    dispatch(ToggleEditWindow(data));
  };
  const onClickRemove = (e) => {
    e.stopPropagation();
    dispatch(DeleteExpense(data));
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
