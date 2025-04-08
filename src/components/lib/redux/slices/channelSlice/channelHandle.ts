/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: channelHandleSliceState = {
	value: '',
	status: "idle",
};

export const channelHandle = createSlice({
	name: "channelHandle",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

export interface channelHandleSliceState {
	value: string;
	status: "idle" | "loading" | "failed";
}
