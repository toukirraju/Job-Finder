import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createJob, getJobs, modifyJob, removeJob } from "./jobsApi";

const initialState = {
  jobs: [],
  selectedJob: {},
  loading: false,
  isError: false,
  error: "",
};

//async thunk

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (type) => {
  const jobs = getJobs(type);

  return jobs;
});

export const addJob = createAsyncThunk("jobs/add", async (job) => {
  const newJob = createJob(job);

  return newJob;
});

export const updateJob = createAsyncThunk("jobs/update", async (job) => {
  const updatedJob = modifyJob(job);

  return updatedJob;
});

export const deleteJob = createAsyncThunk("jobs/delete", async (id) => {
  const deletedJob = removeJob(id);
  return deletedJob;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    selectForUpdate: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.jobs = [];
        state.error = action.error?.message;
      });
    builder
      .addCase(addJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.concat(action.payload);
      })
      .addCase(addJob.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.jobs = [];
        state.error = action.error?.message;
      });
    builder
      .addCase(updateJob.fulfilled, (state, action) => {
        const updatedjobs = state.jobs.map((job) => {
          if (job.id === action.payload.id) {
            return {
              ...job,
              title: action.payload.title,
              type: action.payload.type,
              salary: action.payload.salary,
              deadline: action.payload.deadline,
            };
          }
          return job;
        });
        state.jobs = updatedjobs;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.jobs = [];
        state.error = action.error?.message;
      });

    builder
      .addCase(deleteJob.fulfilled, (state, action) => {
        const updatedjobs = state.jobs.filter(
          (job) => job.id !== action.meta.arg
        );
        state.jobs = updatedjobs;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.jobs = [];
        state.error = action.error?.message;
      });
  },
});

export const { selectForUpdate } = jobsSlice.actions;
export default jobsSlice.reducer;
