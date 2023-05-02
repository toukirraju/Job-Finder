import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import FilterSection from "../components/FilterSection";
import JobList from "../components/JobList";
import { fetchJobs } from "../redux/features/jobs/jobsSlice";

const Remote = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(fetchJobs(pathname));
  }, [pathname, dispatch]);

  return (
    <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
      <FilterSection />

      <JobList />
    </main>
  );
};

export default Remote;
