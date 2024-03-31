import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import "./ExpenseForm.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getExpenseWindowEditState,
  getExpenseWindowCreateState,
  ToggleCreateWindow,
  ToggleEditWindow,
} from "../../features/ExpenseWindowSlice";
import { AddExpense, EditExpense } from "../../features/ExpenseSlice";
import { useSnackbar } from "notistack";

const ExpenseForm = () => {
  const editWindowObj = useSelector(getExpenseWindowEditState);
  const createWindowOpen = useSelector(getExpenseWindowCreateState);
  const [formData, setFormFn] = useState({});
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (editWindowObj !== null) {
      setFormFn(editWindowObj);
    }
  }, [editWindowObj]);

  const HandleChange = (e) => {
    let { name, value } = e.target;
    setFormFn((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const showAlert = (msg, alertType) => {
    enqueueSnackbar(msg, { variant: alertType });
  };
  const validateData = (data) => {
    if (!data.hasOwnProperty("title") || !data["title"]) {
      showAlert("Title required", "error");
      return false;
    }
    if (!data.hasOwnProperty("amount") || Number(data["amount"]) <= 0) {
      showAlert("amount required", "error");

      return false;
    }

    if (
      !data.hasOwnProperty("category") ||
      (data["isExpense"] === "true" && !data["category"])
    ) {
      showAlert("category required", "error");

      return false;
    }
    if (!data.hasOwnProperty("date")) {
      showAlert("date required", "error");

      return false;
    }

    return true;
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (editWindowObj !== null) {
      formData.isExpense = true;

      dispatch(EditExpense(formData));
      dispatch(ToggleEditWindow(null));
      setFormFn({});
    } else {
      formData.id = 0;
      formData.isExpense = true;
      if (!validateData(formData)) return;
      dispatch(AddExpense({ ...formData }));
      dispatch(ToggleCreateWindow(false));
      setFormFn({});
    }
  };

  const HandleCloseForm = (e) => {
    if (editWindowObj !== null) {
      dispatch(ToggleEditWindow(null));
    } else {
      dispatch(ToggleCreateWindow(false));
    }
  };

  const formateDate = (dateString) => {
    let date = new Date(dateString);
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate()
    );
  };
  return (
    <ReactModal
      isOpen={createWindowOpen || editWindowObj !== null}
      className="Modal"
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      <h5>{editWindowObj ? "Edit Expense" : "Create Expense"}</h5>
      <form onSubmit={HandleSubmit} className="expenseForm">
        <input
          type="text"
          name="title"
          placeholder="Entre Title"
          value={formData.title || ""}
          onChange={HandleChange}
          required
        />

        <input
          type="text"
          name="amount"
          placeholder="Enter amount"
          value={formData.amount || ""}
          onChange={HandleChange}
          required
        />
        <select
          type="selector"
          name="category"
          placeholder="Select Category"
          value={formData.category || "food"}
          onChange={HandleChange}
          required
        >
          <option value={"food"}>Food</option>
          <option value={"travel"}>Travel</option>
          <option value={"entertainment"}>Entertainment</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date ? formateDate(formData.date) : ""}
          onChange={HandleChange}
          required
        />
        <input type="submit" value={"Submit"} />
        <input type="button" value={"Cancel"} onClick={HandleCloseForm} />
      </form>
    </ReactModal>
  );
};

export default ExpenseForm;
