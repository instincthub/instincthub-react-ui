import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { channelDetailsSliceState } from "@/types/redux";

const initialState: channelDetailsSliceState = {
  value: { contents: [] },
  status: "idle",
  id: "",
};
export const channelDetails = createSlice({
  name: "channelDetails",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
  },
});
