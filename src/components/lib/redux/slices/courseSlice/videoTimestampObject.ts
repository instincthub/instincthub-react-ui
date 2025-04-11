/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { videoTimestampObjectSliceState } from "src/types/redux";

const initialState: videoTimestampObjectSliceState = {
  value: {},
  status: "idle",
};

export const videoTimestampObject = createSlice({
  name: "videoTimestampObject",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
  },
});
