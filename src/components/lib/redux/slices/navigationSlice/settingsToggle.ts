/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: settingsToggleSliceState = {
	value: false,
	status: "idle",
};

export const settingsToggle = createSlice({
	name: "settingsToggle",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;
		},
	},
});

export interface settingsToggleSliceState {
	value: boolean;
	status: "idle" | "loading" | "failed";
}
