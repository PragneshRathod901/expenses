import { createSlice } from "@reduxjs/toolkit";

const validateData = (data) => {
  if (!data.hasOwnProperty("title") || !data["title"]) {
    return [false, "Invalid title"];
  }
  if (!data.hasOwnProperty("amount") || Number(data["amount"]) <= 0) {
    return [false, "Invalid title"];
  }
  if (!data.hasOwnProperty("isExpense")) {
    return [false, "Invalid title"];
  }

  if (
    !data.hasOwnProperty("category") ||
    (data["isExpense"] === "true" && !data["category"])
  ) {
    return [false, "Invalid title"];
  }
  if (!data.hasOwnProperty("date")) {
    return [false, "Invalid title"];
  }

  if (!data.hasOwnProperty("id") || Number(data["id"]) < 0) {
    return [false, "Invalid title"];
  }
  return [true, ""];
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
      let [success, error] = validateData(action.payload);
      if (!success) {
        state.alert = { message: error, type: "error" };
        return;
      }
      if (state.balance < action.payload.amount) {
        state.alert = {
          message: "You don't have Money to Spend",
          type: "error",
        };
        return;
      }
      action.payload.id = state.value.length;
      state.value = [...state.value, action.payload];
      state.balance = calculateBalance(state.value);
      state.alert = { message: "Added!", type: "success" };
      saveData(state.value);
    },
    EditExpense: (state, action) => {
      let [success, error] = validateData(action.payload);
      if (!success) {
        state.alert = { message: error, type: "error" };
        return;
      }
      if (state.balance < action.payload.amount) {
        state.alert = {
          message: "You don't have Money to Spend",
          type: "error",
        };
        return;
      }
      if (state.value.length > action.payload.id) {
        state.value[action.payload.id] = action.payload;
        state.balance = calculateBalance(state.value);
        saveData(state.value);
        state.alert = { message: "Saved!", type: "success" };
      } else {
        state.alert = { message: "Not found!", type: "error" };
      }
    },
    DeleteExpense: (state, action) => {
      if (state.value.length > action.payload.id) {
        state.value.splice(action.payload.id, 1);
        state.balance = calculateBalance(state.value);
        saveData(state.value);
        state.alert = { message: "Deleted", type: "success" };
      } else {
        state.alert = { message: "Not found!", type: "error" };
      }
    },
    AddBalance: (state, action) => {
      if (action.payload.amount || action.payload.amount <= 0) {
        state.alert = { message: "invalid Amount", type: "error" };
        return;
      }
      if (state.balance < action.payload.amount) {
        state.alert = {
          message: "You don't have Money to Spend",
          type: "error",
        };
        return;
      }
      action.payload.id = state.value.length;
      state.value = [...state.value, action.payload];
      state.balance = calculateBalance(state.value);
      state.alert = { message: "Added!", type: "success" };
      saveData(state.value);
    },
  },
});

export const { AddExpense, EditExpense, DeleteExpense, AddBalance } =
  ExpenseSlice.actions;
export const transactions = (state) => state.Expenses.value;
export const alert = (state) => state.Expenses.alert;
export const getExpense = (state) =>
  state.Expenses.value.reduce(
    (acc, curValue) =>
      curValue.isExpense ? acc + Number(curValue.amount) : acc,
    0
  );

export const getBalance = (state) => state.Expenses.balance;

export default ExpenseSlice.reducer;
