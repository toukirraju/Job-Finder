import axiosInstance from "../../../utils/axios";

///?type=Internship
export const getJobs = async (type) => {
  let queryString = "";
  if (type === "/") {
    queryString = "";
  }
  if (type === "/internship") {
    queryString = "?type=Internship";
  }
  if (type === "/fulltime") {
    queryString = "?type=Full Time";
  }
  if (type === "/remote") {
    queryString = "?type=Remote";
  }
  const response = await axiosInstance.get(`/jobs${queryString}`);

  return response.data;
};

export const createJob = async (job) => {
  const response = await axiosInstance.post("/jobs", job);

  return response.data;
};

export const modifyJob = async (job) => {
  const response = await axiosInstance.patch(`/jobs/${job.id}`, job);

  return response.data;
};

export const removeJob = async (id) => {
  const response = await axiosInstance.delete(`/jobs/${id}`);

  return response.data;
};
