/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { courseSearchSliceState } from "@/types/redux";

const initialState: courseSearchSliceState = {
  value: "",
  status: "idle",
};

export const courseSearch = createSlice({
  name: "courseSearch",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    input: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});
