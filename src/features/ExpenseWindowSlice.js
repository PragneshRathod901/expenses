import { createSlice } from "@reduxjs/toolkit";

export const expenseWindowSlice = createSlice({
  name: "ExpenseWindow",
  initialState: {
    createWindow: false,
    EditIdWindow: null,
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
  },
});

export const { ToggleCreateWindow, ToggleEditWindow } =
  expenseWindowSlice.actions;

export const getExpenseWindowEditState = (state) =>
  state.ExpenseWindow.EditIdWindow;
export const getExpenseWindowCreateState = (state) =>
  state.ExpenseWindow.createWindow;

export default expenseWindowSlice.reducer;
