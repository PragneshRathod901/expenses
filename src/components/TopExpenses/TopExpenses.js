import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { useSelector } from "react-redux";
import { transactions } from "../../features/ExpenseSlice";
import { calculateValue } from "../ExpensePieChart/ExpensePieChart";
import "./TopExpense.css";

const TopExpenses = () => {
  const _transactions = useSelector(transactions);
  const [data, SetData] = useState([]);
  useEffect(() => {
    SetData(calculateValue(_transactions).sort((a, b) => b.value - a.value));
  }, [_transactions]);
  return (
    <div className="card topExpense">
      <div className="heading">Top Expenses</div>
      <div className={"card-bg-white"}>
        <BarChart
          width={300}
          height={345}
          data={data}
          layout="vertical"
          padding={"1em"}
        >
          <XAxis type="number" axisLine={false} display="none" />
          <YAxis
            type="category"
            axisLine={false}
            dataKey="label"
            width={100}
            tickLine={false}
          />

          <Bar
            dataKey="value"
            fill="#8884d8"
            barSize={21}
            radius={[0, 50, 50, 0]}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default TopExpenses;
