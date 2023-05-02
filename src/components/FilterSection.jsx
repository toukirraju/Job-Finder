import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  searchByTitle,
  sortBySalary,
} from "../redux/features/filter/FilterSlice";

const FilterSection = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { searchKeyword } = useSelector((state) => state.filter);
  const [sortType, setSortType] = useState("");
  const [searchValue, setSearchValue] = useState(searchKeyword);

  useEffect(() => {
    dispatch(sortBySalary(sortType));
  }, [sortType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByTitle(searchValue));
  };

  let title = "";
  if (pathname === "/") {
    title = "All Available Jobs";
  }
  if (pathname === "/internship") {
    title = "All Intern Jobs";
  }
  if (pathname === "/fulltime") {
    title = "All Full Time Jobs";
  }
  if (pathname === "/remote") {
    title = "All Remote Jobs";
  }
  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">{title}</h1>
      <div className="flex gap-4">
        <form onSubmit={handleSubmit}>
          <div className="search-field group flex-1">
            <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
            <input
              type="text"
              placeholder="Search Job"
              className="search-input"
              id="lws-searchJob"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </form>
        <select
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          className="flex-1"
          onChange={(e) => setSortType(e.target.value)}
          value={sortType.sort}
        >
          <option value="">Default</option>
          <option value="ascending">Salary (Low to High)</option>
          <option value="descending">Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
