import React, { useState } from "react";
import "./TransactionTable.css";
import { useSelector } from "react-redux";
import { transactions } from "../../features/ExpenseSlice";
import TransactionIemCard from "../TransactionItemCard/TransactionItemCard";
import Pagination from "../Pagination/Pagination";

const TransactionList = () => {
  const _transactions = useSelector(transactions);
  const [pageNum, setPageNumFn] = useState(0);
  const maxItemPerPage = 1;
  const getMaxPageCount = (itemCount) => {
    return Math.ceil(itemCount / maxItemPerPage);
  };
  return (
    <div className="card">
      <div className="heading">Recent Transactions</div>
      <div className={"transactionTable card-bg-white"}>
        {_transactions &&
          _transactions
            .slice(
              //filter items
              pageNum * maxItemPerPage,
              pageNum * maxItemPerPage + maxItemPerPage
            )
            .map((val) => (
              <div key={val.id}>
                <TransactionIemCard data={val} />
                <div className="flex justifyContentCentre">
                  <hr></hr>
                </div>
              </div>
            ))}
        <Pagination
          pageNo={pageNum}
          maxPageNo={getMaxPageCount(_transactions.length)}
          setPageNo={setPageNumFn}
        />
      </div>
    </div>
  );
};

export default TransactionList;
