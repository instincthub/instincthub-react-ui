/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: appToggleSliceState = {
	value: {
		toggle: true,
		use: "menu",
	},
	status: "idle",
};

export const appToggle = createSlice({
	name: "appToggle",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});

export interface appToggleSliceState {
	value: object;
	status: "idle" | "loading" | "failed";
}
