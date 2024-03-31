import React from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  AddBalanceWindowState,
  ToggleBalanceWindow,
} from "../../features/ExpenseWindowSlice";
import { AddBalance } from "../../features/ExpenseSlice";

import "./AddBalanceWindowState.css";

const AddBalanceWindow = () => {
  const WindowOpen = useSelector(AddBalanceWindowState);
  const dispatch = useDispatch();
  const HandleCloseForm = (e) => {
    dispatch(ToggleBalanceWindow(false));
  };
  const HandleSubmit = (e) => {
    e.preventDefault();

    if (Number(e.target.amount.value) > 0) {
      dispatch(
        AddBalance({
          title: "income",
          id: 0,
          amount: Number(e.target.amount.value),
          isExpense: false,
        })
      );
      dispatch(ToggleBalanceWindow(false));
    }
  };

  return (
    <ReactModal
      isOpen={WindowOpen}
      className="Modal"
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      <h5>Add Balance</h5>
      <form onSubmit={HandleSubmit} className="addBalanceForm">
        <input type="text" name="amount" placeholder="Entre Amount" required />

        <input className="balance-submit" type="submit" value={"Submit"} />
        <input
          className="balance-cancel"
          type="button"
          value={"Cancel"}
          onClick={HandleCloseForm}
        />
      </form>
    </ReactModal>
  );
};

export default AddBalanceWindow;
