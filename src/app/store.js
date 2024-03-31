import { configureStore } from "@reduxjs/toolkit";
import ExpenseSlice from "../features/ExpenseSlice";
import ExpenseWindowSlice from "../features/ExpenseWindowSlice";

export const store = configureStore({
  reducer: {
    Expenses: ExpenseSlice,
    ExpenseWindow: ExpenseWindowSlice,
  },
});
