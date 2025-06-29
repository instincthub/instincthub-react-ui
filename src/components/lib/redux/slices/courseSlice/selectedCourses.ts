import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface selectedCoursesSliceState {
  value: object;
  status: "idle" | "loading" | "failed";
  id: string;
}

const initialState: selectedCoursesSliceState = {
  value: {
    courses: [],
    units: 0,
    length: 0,
    preview: false,
  },
  status: "idle",
  id: "",
};

export const selectedCourses = createSlice({
  name: "selectedCourses",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
  },
});
