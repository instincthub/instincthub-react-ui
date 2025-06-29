/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: courseNextStepSliceState = {
	value: {},
	status: "idle",
};

export const courseNextStep = createSlice({
	name: "courseNextStep",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});

export interface courseNextStepSliceState {
	value: object;
	status: "idle" | "loading" | "failed";
}
