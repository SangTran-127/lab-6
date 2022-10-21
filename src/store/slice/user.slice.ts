import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { error, success } from "./notification.slice";
export interface User {
  id: string;
  email: string;
  fullname: string;
  password: string;
  avatar: string;
  current_resume_url: string | null;
  status: string;
  phone: string | null;
  address: string | null;
}

export interface UserSliceState {
  user?: User;
  token: string | undefined;
  loading: boolean;
  auth: boolean;
}

const initialState: UserSliceState = {
  user: undefined,
  token: undefined,
  loading: false,
  auth: false,
};

export const update = createAsyncThunk(
  "user/update",
  async (params: any, thunkAPI) => {
    // console.log(params);
    const res = await axios.patch(
      "http://localhost:8000/api/member/profile",
      params.data,
      {
        headers: { Authorization: `Bearer ${params.token}` },
      }
    );

    // console.log(res.data);
    return res.data;
  }
);
export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/member-auth/login",
        {
          email: params.email,
          password: params.password,
        }
      );
      const { member, token }: { member: User; token: string } = res.data;
      // const { id } = member;
      if (token) {
        thunkAPI.dispatch(success(`Welcome, ${member.fullname}`));
      }
      return { member, token };
    } catch (err: any) {
      thunkAPI.dispatch(error(err.response.data.message));
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.auth = false;

      state.token = undefined;
      state.user = undefined;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.auth = false;
      state.user = undefined;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = true;
      state.token = action.payload?.token;
      state.user = action.payload?.member;
    });
  },
});

export const { reducer: userReducer } = userSlice;
export default userReducer;
// {
//     data: {
//       fullname: string;
//       email: string;
//       address: string;
//       phone: string;
//       avatar: string | undefined;
//     };
//     token: string | undefined;
//   },
