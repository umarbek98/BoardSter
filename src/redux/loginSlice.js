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
    const resp = await instance.get("http://localhost:5000/check");
    console.log(`resp: ${JSON.stringify(resp, null, 2)}`);
    if (resp.data.userId) {
      return resp.data;
    } else {
      throw new Error("User is not logged in.");
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
    fulfilled: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  }
);

export const makeLoginRequest = createAsyncThunk(
  "login/makeLoginRequest",
  async (loginData, { rejectWithValue }) => {
    try {
      const resp = await instance.post(
        "http://localhost:5000/login",
        loginData
      );
      const { token, message, status } = resp.data;
      Cookies.set("myjwt", token, { expires: 1 });
      if (status === 200) {
        console.log(message);
      }
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

export const makeLogoutRequest = createAsyncThunk(
  "login/makeLogoutRequest",
  async () => {
    const resp = await instance.post("http://localhost:5000/logout");
    Cookies.remove("myjwt");
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
    [makeLogoutRequest.fulfilled]: (state) => {
      state.status = "succeeded";
      state.isLoggedIn = false;
      state.user = null;
    },
    [makeLogoutRequest.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
