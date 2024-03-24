import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "../features/balanceSlice";

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
  },
});
