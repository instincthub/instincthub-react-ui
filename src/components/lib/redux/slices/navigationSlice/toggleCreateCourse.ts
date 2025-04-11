/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: toggleCreateCourseSliceState = {
	value: {
		toggle: false,
		step: "overview",
	},
	status: "idle",
};

export const toggleCreateCourse = createSlice({
	name: "toggleCreateCourse",
	initialState,
	reducers: {
		toggle: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});

export interface toggleCreateCourseSliceState {
	value: object;
	status: "idle" | "loading" | "failed";
}


