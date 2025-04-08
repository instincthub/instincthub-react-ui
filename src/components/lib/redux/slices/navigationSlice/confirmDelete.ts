import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: confirmDeleteSliceState = {
	value: {},
	status: "idle",
};

export const confirmDelete = createSlice({
	name: "confirmDelete",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});

export interface confirmDeleteSliceState {
	value: object;
	status: "idle" | "loading" | "failed";
}
