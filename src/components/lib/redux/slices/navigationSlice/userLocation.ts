/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: userLocationSliceState = {
	value: {},
	status: "idle",
};

export const userLocation = createSlice({
	name: "userLocation",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});

export interface userLocationSliceState {
	value: object;
	status: "idle" | "loading" | "failed";
}
