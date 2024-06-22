import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser as apiLoginUser, signupUser as apiSignupUser } from "../../services/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const response = await apiLoginUser(credentials);
    return response.data;
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData) => {
    const response = await apiSignupUser(userData);
    return response.data;
  }
);

const initialState = {
  isLoggedIn: false,
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: "auth",
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
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user; // Ensure we store the user object correctly
      state.isLoggedIn = true; 
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(signupUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
