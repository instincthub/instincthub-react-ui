import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courseDetailsSliceState } from "src/types/redux";



const initialState: courseDetailsSliceState = {
	value: { contents: [] },
	status: "idle",
	id: "",
};
export const courseDetails = createSlice({
	name: "courseDetails",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});
