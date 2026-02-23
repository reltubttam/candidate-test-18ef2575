import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile, WorkStatus } from "../../shared/types";
import { mockUser } from "../../shared/models/mockData";

export interface UserState {
  profile: UserProfile;
}

const initialState: UserState = {
  profile: mockUser,
};

export const userSlice = createSlice({
  name: "navUser",
  initialState,
  reducers: {
    // Navigation-specific functionality would go here. This updateWorkStatus will not update the dashboard by design.
    updateWorkStatus: (state, action: PayloadAction<WorkStatus>) => {
      state.profile.workStatus = action.payload;
    },
  },
});

export const { updateWorkStatus } = userSlice.actions;
export default userSlice.reducer;
