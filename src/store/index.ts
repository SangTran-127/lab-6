import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slice/notification.slice";
import userReducer from "./slice/user.slice";
import { login } from "./slice/user.slice";
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
  },
});

// const loginResult = await store.dispatch(
//   login({ email: "sang@gmail.com", password: "12072002" })
// );
// console.log(loginResult);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
