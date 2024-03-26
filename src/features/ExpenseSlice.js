import { createSlice } from "@reduxjs/toolkit";

const validateData = (data) => {
  if (!data.hasOwnProperty("title") || !data["title"]) {
    return false;
  }
  if (!data.hasOwnProperty("amount") || Number(data["amount"]) <= 0) {
    return false;
  }
  if (!data.hasOwnProperty("isExpense")) {
    return false;
  }

  if (
    !data.hasOwnProperty("category") ||
    (data["isExpense"] === "true" && !data["category"])
  ) {
    return false;
  }
  if (!data.hasOwnProperty("date")) {
    return false;
  }

  if (!data.hasOwnProperty("id") || Number(data["id"]) < 0) {
    return false;
  }
  return true;
};

const getDataFromLocalStorage = () => {
  if (localStorage.getItem("expenses")) {
    let data = JSON.parse(localStorage.getItem("expenses"));
    return Array.isArray(data) ? data : [];
  } else {
    return [
      {
        title: "income",
        amount: 5000,
        category: "",
        isExpense: false,
        date: new Date(),
        id: 0,
      },
      {
        title: "Food",
        amount: 500,
        category: "Food",
        isExpense: true,
        date: new Date(),
        id: 1,
      },
    ];
  }
};

export const ExpenseSlice = createSlice({
  name: "Expenses",
  initialState: {
    value: getDataFromLocalStorage(),
  },
  reducers: {
    AddExpense: (state, action) => {
      if (!validateData(action.payload)) {
        return;
      }
      action.payload.id = state.Expenses.value.length;
      state.Expenses.value.push(action.payload);
    },
    EditExpense: (state, action) => {
      if (
        validateData(action.payload) &&
        state.Expenses.value.length > action.payload.id
      ) {
        state.Expenses.value[action.payload.id] = action.payload;
      }
    },
  },
});

export const { AddExpense, EditExpense } = ExpenseSlice.actions;
export const transactions = (state) => state.Expenses.value;
export const getExpense = (state) =>
  state.Expenses.value.reduce(
    (acc, curValue) => (curValue.isExpense ? acc + curValue.amount : acc),
    0
  );

export const getBalance = (state) =>
  state.Expenses.value.reduce(
    (acc, curValue) =>
      !curValue.isExpense ? acc + curValue.amount : acc - curValue.amount,
    0
  );

export default ExpenseSlice.reducer;
