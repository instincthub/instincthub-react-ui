/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: screenSizeSliceState = {
	value: {},
	status: "idle",
};

export const screenSize = createSlice({
	name: "screenSize",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});

export interface screenSizeSliceState {
	value: object;
	status: "idle" | "loading" | "failed";
}
