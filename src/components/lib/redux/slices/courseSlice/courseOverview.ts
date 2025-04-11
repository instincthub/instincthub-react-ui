import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courseOverviewSliceState } from "src/types/redux";

const initialState: courseOverviewSliceState = {
	value: { modules: [] },
	status: "idle",
	id: "",
};

export const courseOverview = createSlice({
	name: "courseOverview",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});
