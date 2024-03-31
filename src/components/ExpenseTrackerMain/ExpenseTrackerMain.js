import React from "react";
import "./ExpenseTrackerMain.css";
import BalanceCard from "../BalanceCard/BalanceCard";
import { getBalance, getExpense } from "../../features/ExpenseSlice";
import { useSelector } from "react-redux";
import ExpensePieChart from "../ExpensePieChart/ExpensePieChart";

const CardWithHeader = ({ header }) => {
  const balance = useSelector(getBalance);
  const expense = useSelector(getExpense);
  return (
    <div className="card">
      <div className="heading">{header}</div>
      <div className={"cardContent cardShadow "}>
        <BalanceCard balance={balance} isExpenseCard={false} />
        <BalanceCard balance={expense} isExpenseCard={true} />
        <ExpensePieChart />
      </div>
    </div>
  );
};

export default CardWithHeader;
