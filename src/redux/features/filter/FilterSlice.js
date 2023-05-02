import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortType: "",
  searchKeyword: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    sortBySalary: (state, action) => {
      state.sortType = action.payload;
    },
    searchByTitle: (state, action) => {
      state.searchKeyword = action.payload;
    },
  },
});

export const { sortBySalary, searchByTitle } = filterSlice.actions;
export default filterSlice.reducer;
