import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from "../features/filter/FilterSlice";
import jobsSlice from "../features/jobs/jobsSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsSlice,
    filter: FilterSlice,
  },
});
