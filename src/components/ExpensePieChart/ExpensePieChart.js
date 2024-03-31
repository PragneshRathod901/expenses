import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import PieChartLabel from "./PieChartLabel";
import "./ExpensePieChart.css";
import { useSelector } from "react-redux";
import { transactions } from "../../features/ExpenseSlice";

const getColorClass = (key) => {
  switch (key) {
    case "food":
      return "foodColor";
    case "travel":
      return "travelColor";
    case "entertainment":
      return "entertainmentColor";
    default:
      return "";
  }
};
const getColorValue = (key) => {
  switch (key) {
    case "food":
      return "#A000FF";
    case "travel":
      return "#FDE006";
    case "entertainment":
      return "#FF9304";
    default:
      return "#fff";
  }
};
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const calculateValue = (array) => {
  let mp = new Map();
  for (let i = 0; i < array.length; i++) {
    if (array[i].isExpense) {
      if (mp.has(array[i].category)) {
        let value = mp.get(array[i].category);
        mp.set(array[i].category, value + Number(array[i].amount));
      } else {
        mp.set(array[i].category, Number(array[i].amount));
      }
    }
  }

  let res = [];
  for (let [key, _value] of mp) {
    res.push({
      name: key,
      value: _value,
      colorClass: getColorClass(key),
      color: getColorValue(key),
    });
  }
  console.log(res);
  return res;
};

const ExpensePieChart = () => {
  const _transactions = useSelector(transactions);
  const [data, SetData] = useState([]);
  useEffect(() => {
    SetData(calculateValue(_transactions));
  }, [_transactions]);

  return (
    <div className="pieMainContainer">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <div className="pieLabelBar">
        {data.map((val) => (
          <PieChartLabel
            key={"label" + val.name}
            labelName={val.name}
            labelClass={"pieBoxLabel " + val.colorClass}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpensePieChart;
