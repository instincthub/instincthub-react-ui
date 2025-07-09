/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { videoTimestampSliceState } from "@/types/redux";

const initialState: videoTimestampSliceState = {
  value: { seconds: 10, playing: false, count: 0 },
  status: "idle",
};

export const videoTimestamp = createSlice({
  name: "videoTimestamp",
  initialState,
  reducers: {
    seconds: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
  },
});
