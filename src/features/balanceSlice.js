import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    value: Number(localStorage.getItem("balance")),
  },
  reducers: {
    AddIncome: (state, action) => {
      state.value += action.payload;
    },
  },
});
export const { AddIncome } = balanceSlice.actions;
export const selectBalance = (state) => state.balance.value;

export default balanceSlice.reducer;
