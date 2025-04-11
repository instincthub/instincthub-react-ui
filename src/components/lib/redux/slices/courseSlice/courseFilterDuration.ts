/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { courseFilterDurationSliceState } from "src/types/redux";

const initialState: courseFilterDurationSliceState = {
  value: [],
  status: "idle",
};

export const courseFilterDuration = createSlice({
  name: "filterDuration",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.push(action.payload);
    },
    decrement: (state, action: PayloadAction<string>) => {
      const newFilter: string[] = [];
      state.value.find((c) => {
        if (c !== action.payload) {
          newFilter.push(c);
        }
      });

      state.value = newFilter;
    },
  },
});

