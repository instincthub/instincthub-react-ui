/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: videoEndCountdownSliceState = {
  value: 10,
  status: "idle",
};

export const videoEndCountdown = createSlice({
  name: "videoEndCountdown",
  initialState,
  reducers: {
    counts: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export interface videoEndCountdownSliceState {
  value: number;
  status: "idle" | "loading" | "failed";
}
