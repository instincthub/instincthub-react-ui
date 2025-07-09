import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stepContentSliceState } from "@/types/redux";

const initialState: stepContentSliceState = {
  value: { contents: [] },
  status: "idle",
  id: "",
};

export const stepContent = createSlice({
  name: "stepContent",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
  },
});
