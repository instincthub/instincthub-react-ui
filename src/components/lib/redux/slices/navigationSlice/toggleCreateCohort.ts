import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: toggleCreateCohortSliceState = {
  value: {
    toggle: false,
    step: "overview",
  },
  status: "idle",
};

export const toggleCreateCohort = createSlice({
  name: "toggleCreateCohort",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
  },
});

export interface toggleCreateCohortSliceState {
  value: object;
  status: "idle" | "loading" | "failed";
}
