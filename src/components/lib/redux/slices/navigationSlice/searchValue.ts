/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: searchValueSliceState = {
	value: "",
	status: "idle",
};

export const searchValue = createSlice({
	name: "searchValue",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

export interface searchValueSliceState {
	value: string;
	status: "idle" | "loading" | "failed";
}
