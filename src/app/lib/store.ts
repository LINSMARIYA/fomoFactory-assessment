// store/index.js
"use client";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: {
    counter: rootReducer,
  },
});
