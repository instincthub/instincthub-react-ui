/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: unsplashObjectSliceState = {
	value: {},
	status: "idle",
};

export const unsplashObject = createSlice({
	name: "unsplashObject",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});

export interface unsplashObjectSliceState {
	value: object;
	status: "idle" | "loading" | "failed";
}
