import { configureStore } from "@reduxjs/toolkit";
import ExpenseSlice from "../features/ExpenseSlice";

export const store = configureStore({
  reducer: {
    Expenses: ExpenseSlice,
  },
});
