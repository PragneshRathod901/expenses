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
const calculateBalance = (data) =>
  data.reduce(
    (acc, curValue) =>
      !curValue.isExpense
        ? acc + curValue.amount
        : acc - Number(curValue.amount),
    0
  );

const getDataFromLocalStorage = () => {
  let value = [];
  if (localStorage.getItem("expenses")) {
    let data = JSON.parse(localStorage.getItem("expenses"));
    value = Array.isArray(data) ? data : [];
  } else {
    value = [
      {
        title: "income",
        amount: 5000,
        category: "",
        isExpense: false,
        date: "2024/03/31",
        id: 0,
      },
    ];
  }
  return { value, balance: calculateBalance(value) };
};
const saveData = (data) =>
  localStorage.setItem("expenses", JSON.stringify(data));

export const ExpenseSlice = createSlice({
  name: "Expenses",
  initialState: getDataFromLocalStorage(),
  reducers: {
    AddExpense: (state, action) => {
      if (!validateData(action.payload)) {
        return;
      }

      action.payload.id = state.value.length;
      action.payload.isExpense = true;
      state.value = [...state.value, action.payload];
      state.balance = calculateBalance(state.value);
      saveData(state.value);
    },
    EditExpense: (state, action) => {
      if (
        validateData(action.payload) &&
        state.value.length > action.payload.id
      ) {
        state.value[action.payload.id] = action.payload;
        state.balance = calculateBalance(state.value);
        saveData(state.value);
      }
    },
    DeleteExpense: (state, action) => {
      if (state.value.length > action.payload.id) {
        state.value.splice(action.payload.id, 1);
        state.balance = calculateBalance(state.value);
        saveData(state.value);
      }
    },
  },
});

export const { AddExpense, EditExpense, DeleteExpense } = ExpenseSlice.actions;
export const transactions = (state) => state.Expenses.value;
export const getExpense = (state) =>
  state.Expenses.value.reduce(
    (acc, curValue) =>
      curValue.isExpense ? acc + Number(curValue.amount) : acc,
    0
  );

export const getBalance = (state) => state.Expenses.balance;

export default ExpenseSlice.reducer;
