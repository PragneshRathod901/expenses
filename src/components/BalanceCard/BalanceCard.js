import React from "react";
import "./Balance.css";
import { useSelector, useDispatch } from "react-redux";
import { AddIncome } from "../../features/balanceSlice";

const BalanceCard = () => {
  const balance = useSelector((state) => state.balance.value);
  const dispatcher = useDispatch();
  return (
    <div className="card-balance">
      <div className="balanceHeader">
        Wallet Balance: <span>₹{balance}</span>
      </div>
      <button
        className="AddExpenceBtn"
        onClick={() => dispatcher(AddIncome(100))}
      >
        + Add Income
      </button>
    </div>
  );
};

export default BalanceCard;
