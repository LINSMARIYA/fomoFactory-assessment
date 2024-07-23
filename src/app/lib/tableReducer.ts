// tableReducer.ts or tableSlice.ts
"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CoinData = {
  name: string;
  symbol: string;
  volume: number;
  rate: number;
  cap: number;
  liquidity: number;
};

type TableState = {
  data: CoinData[];
};

const initialState: TableState = {
  data: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<CoinData[]>) {
      state.data = action.payload;
    },
  },
});

export const { setData } = tableSlice.actions;

export default tableSlice.reducer;
