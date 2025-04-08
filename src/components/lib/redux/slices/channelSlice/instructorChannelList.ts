import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { instructorChannelListSliceState } from "src/types/redux";

const initialState: instructorChannelListSliceState = {
  value: [],
  status: "idle",
  id: "",
};
export const instructorChannelList = createSlice({
  name: "instructorChannelList",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<[]>) => {
      state.value = action.payload;
    },
  },
});
