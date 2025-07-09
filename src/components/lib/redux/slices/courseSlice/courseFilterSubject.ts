/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { courseFilterSubjectSliceState } from "@/types/redux";

const initialState: courseFilterSubjectSliceState = {
  value: [],
  status: "idle",
};

export const courseFilterSubject = createSlice({
  name: "filterSubject",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.push(action.payload);
    },
    decrement: (state, action: PayloadAction<number>) => {
      const newFilter: any[] = [];
      state.value.find((c) => {
        if (c !== action.payload) {
          newFilter.push(c);
        }
      });

      state.value = newFilter;
    },
  },
});
