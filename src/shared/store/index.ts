import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const sharedStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type SharedRootState = ReturnType<typeof sharedStore.getState>;
export type SharedDispatch = typeof sharedStore.dispatch;

export default sharedStore;
