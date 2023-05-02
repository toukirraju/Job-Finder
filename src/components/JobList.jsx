import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleJob from "./SingleJob";

const JobList = () => {
  const { jobs, loading, isError, error } = useSelector((state) => state.jobs);
  const { sortType, searchKeyword } = useSelector((state) => state.filter);

  const [data, setData] = useState([...jobs]);
  // console.log(sortType);

  useEffect(() => {
    setData([...jobs]);
  }, [jobs]);

  useEffect(() => {
    if (sortType === "ascending") {
      setData([...data.sort((a, b) => a.salary - b.salary)]);
    }
    if (sortType === "descending") {
      setData([...data.sort((a, b) => b.salary - a.salary)]);
    }

    if (sortType === "") {
      setData([...jobs]);
    }
  }, [sortType]);

  //decide what to render
  let content = null;
  if (loading && !isError) {
    content = <h4>Loading...</h4>;
  }
  if (!loading && isError) {
    content = <h4>{error}</h4>;
  }

  if (!loading && !isError && jobs?.length === 0) {
    content = <h4>No jobs found</h4>;
  }

  if (!loading && !isError && jobs?.length > 0) {
    content = data
      .filter((job) => {
        const formattedTitle = job.title.toUpperCase().replace(/\s+/g, "");
        const formattedSearchKeyword = searchKeyword.toUpperCase();
        return formattedTitle.includes(formattedSearchKeyword);
      })
      .map((job) => <SingleJob key={job.id} job={job} />);
  }

  return (
    <div className="jobs-list">
      {/* <!-- Single Job--> */}
      {content}
      {/* <!-- Single Job--> */}
    </div>
  );
};

export default JobList;
