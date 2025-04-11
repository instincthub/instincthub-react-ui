/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: activeChannelSliceState = {
	value: {},
	status: "idle",
};

export const activeChannel = createSlice({
	name: "activeChannel",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});

export interface activeChannelSliceState {
	value: object;
	status: "idle" | "loading" | "failed";
}
