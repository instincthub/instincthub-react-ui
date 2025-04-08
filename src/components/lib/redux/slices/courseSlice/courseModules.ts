import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseModule, CourseModulesSliceState } from "src/types/redux";

const initialState: CourseModulesSliceState = {
  value: [],
  status: "idle",
};

export const courseModules = createSlice({
  name: "courseModules",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<CourseModule[]>) => {
      state.value = action.payload;
    },
    addModule: (state, action: PayloadAction<CourseModule>) => {
      state.value.push(action.payload);
    },
    decrement: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(
        (module) => module.id !== action.payload
      );
    },
  },
});
