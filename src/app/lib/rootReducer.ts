// store/index.js (or store/index.ts for TypeScript)
"use client";
import { combineReducers } from "redux";
import tableReducer from "./tableReducer";

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  table: tableReducer,
});
