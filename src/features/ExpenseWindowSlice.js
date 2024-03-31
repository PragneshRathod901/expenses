import { createSlice } from "@reduxjs/toolkit";

export const expenseWindowSlice = createSlice({
  name: "ExpenseWindow",
  initialState: {
    createWindow: false,
    EditIdWindow: null,
    AddBalanceWindow: false,
  },
  reducers: {
    ToggleCreateWindow: (state, action) => {
      state.createWindow = action.payload;
      state.EditIdWindow = null;
    },
    ToggleEditWindow: (state, action) => {
      state.createWindow = false;
      state.EditIdWindow = action.payload;
    },
    ToggleBalanceWindow: (state, action) => {
      state.AddBalanceWindow = action.payload;
    },
  },
});

export const { ToggleCreateWindow, ToggleEditWindow, ToggleBalanceWindow } =
  expenseWindowSlice.actions;

export const getExpenseWindowEditState = (state) =>
  state.ExpenseWindow.EditIdWindow;
export const getExpenseWindowCreateState = (state) =>
  state.ExpenseWindow.createWindow;
export const AddBalanceWindowState = (state) =>
  state.ExpenseWindow.AddBalanceWindow;
export default expenseWindowSlice.reducer;
