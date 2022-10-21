import { createSlice } from "@reduxjs/toolkit";

export interface NotificationSliceState {
  success?: boolean;
  error?: boolean;
  message?: string | null;
}

const initialState: NotificationSliceState = {
  success: false,
  error: false,
  message: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    success: (state, action) => {
      state.success = true;
      state.error = false;
      state.message = action.payload;
    },
    error: (state, action) => {
      state.success = false;
      state.error = true;
      state.message = action.payload;
    },
  },
});
export const { success, error } = notificationSlice.actions;
export const { reducer: notificationReducer } = notificationSlice;
export default notificationReducer;
