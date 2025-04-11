import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: statusMessageStateSliceState = {
	value: {
		status: 0,
		message: "",
	},
	status: "idle",
};

export const statusMessageState = createSlice({
	name: "statusMessageState",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});

export interface statusMessageStateSliceState {
	value: object;
	status: "idle" | "loading" | "failed";
}
