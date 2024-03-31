import React from "react";
import "./Balance.css";
import {
  ToggleCreateWindow,
  ToggleBalanceWindow,
} from "../../features/ExpenseWindowSlice";
import { useDispatch } from "react-redux";

const BalanceCard = ({ balance, isExpenseCard }) => {
  const dispatch = useDispatch();
  const HandleClickAction = (e) => {
    if (isExpenseCard) {
      dispatch(ToggleCreateWindow(true));
    } else {
      dispatch(ToggleBalanceWindow(true));
    }
  };
  return (
    <div className="card-balance">
      <div className="balanceHeader">
        {isExpenseCard ? "Expenses" : "Wallet Balance"}:{" "}
        <span className={isExpenseCard ? "expense" : "balance"}>
          ₹{balance}
        </span>
      </div>
      <button
        className={isExpenseCard ? "AddExpenseBtn" : "AddBalanceBtn"}
        onClick={HandleClickAction}
      >
        {isExpenseCard ? "+ Add Expense" : "+ Add Income"}
      </button>
    </div>
  );
};

export default BalanceCard;
