/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: feedbackToggleSliceState = {
	value: false,
	status: "idle",
};

export const feedbackToggle = createSlice({
	name: "feedbackToggle",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;
		},
	},
});

export interface feedbackToggleSliceState {
	value: boolean;
	status: "idle" | "loading" | "failed";
}
