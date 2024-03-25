import React from "react";
import "./Balance.css";

const BalanceCard = ({ balance, isExpenseCard }) => {
  return (
    <div className="card-balance">
      <div className="balanceHeader">
        {isExpenseCard ? "Expenses" : "Wallet Balance"}:{" "}
        <span className={isExpenseCard ? "expense" : "balance"}>
          ₹{balance}
        </span>
      </div>
      <button className={isExpenseCard ? "AddExpenseBtn" : "AddBalanceBtn"}>
        {isExpenseCard ? "+ Add Expense" : "+ Add Income"}
      </button>
    </div>
  );
};

export default BalanceCard;
