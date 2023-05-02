import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addJob, updateJob } from "../redux/features/jobs/jobsSlice";

const ManageJob = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedJob } = useSelector((state) => state.jobs);

  const [state, setState] = useState({
    title: "",
    type: "",
    salary: 0,
    deadline: "",
  });

  const resetForm = () => {
    setState({
      title: "",
      type: "",
      salary: 0,
      deadline: "",
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addJob(state));
    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateJob(state));
    navigate("/");
  };

  useEffect(() => {
    if (type === "add") {
      setState({
        title: "",
        type: "",
        salary: 0,
        deadline: "",
      });
    } else {
      setState({ ...selectedJob });
    }
  }, [type, selectedJob]);

  return (
    <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
      <h1 className="mb-10 text-center lws-section-title">
        {type === "add" ? "Add New Job" : "Update Job"}
      </h1>

      <div className="max-w-3xl mx-auto">
        <form
          className="space-y-6"
          onSubmit={type === "add" ? handleSubmit : handleUpdate}
        >
          <div className="fieldContainer">
            <label
              htmlFor="lws-JobTitle"
              className="text-sm font-medium text-slate-300"
            >
              Job Title
            </label>
            <select
              id="lws-JobTitle"
              name="title"
              onChange={handleChange}
              value={state.title}
              required
            >
              <option value="" hidden selected>
                Select Job
              </option>
              <option>Software Engineer</option>
              <option>Software Developer</option>
              <option>Full Stack Developer</option>
              <option>MERN Stack Developer</option>
              <option>DevOps Engineer</option>
              <option>QA Engineer</option>
              <option>Product Manager</option>
              <option>Social Media Manager</option>
              <option>Senior Executive</option>
              <option>Junior Executive</option>
              <option>Android App Developer</option>
              <option>IOS App Developer</option>
              <option>Frontend Developer</option>
              <option>Frontend Engineer</option>
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobType">Job Type</label>
            <select
              id="lws-JobType"
              name="type"
              onChange={handleChange}
              value={state.type}
              required
            >
              <option value="" hidden selected>
                Select Job Type
              </option>
              <option>Full Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobSalary">Salary</label>
            <div className="flex border rounded-md shadow-sm border-slate-600">
              <span className="input-tag">BDT</span>
              <input
                type="number"
                onChange={handleChange}
                value={state.salary}
                name="salary"
                id="lws-JobSalary"
                required
                className="!rounded-l-none !border-0"
                placeholder="20,00,000"
              />
            </div>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobDeadline">Deadline</label>
            <input
              type="date"
              onChange={handleChange}
              value={state.deadline}
              name="deadline"
              id="lws-JobDeadline"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              id="lws-submit"
              className="cursor-pointer btn btn-primary w-fit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ManageJob;
