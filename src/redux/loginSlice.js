import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../instance/userInstance";
import Cookies from "js-cookie";

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const makeLoginCheckRequest = createAsyncThunk(
  "login/makeLoginCheckRequest",
  async () => {
    const resp = await instance.get("/check");
    return resp.data;
  },
  {
    pending: (state) => {
      state.status = "loading";
    },
    rejected: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  }
);

export const makeLoginRequest = createAsyncThunk(
  "login/makeLoginRequest",
  async (loginData, { rejectWithValue }) => {
    try {
      console.log(loginData);
      const resp = await instance.post("/login", loginData);
      Cookies.set("myjwt", resp.data.token, { expires: 1 });
      return resp.data;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        console.log(err);
        return rejectWithValue("Invalid email or password.");
      } else {
        return rejectWithValue("Something went wrong. Please try again later.");
      }
    }
  },
  {
    pending: (state) => {
      state.status = "loading";
    },
    rejected: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [makeLoginCheckRequest.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    [makeLoginRequest.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    [makeLoginRequest.rejected]: (state) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
