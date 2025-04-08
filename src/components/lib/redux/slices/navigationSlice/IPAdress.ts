/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: IPAdressSliceState = {
	value: {
		toggle: true,
		use: "app",
	},
	status: "idle",
};

export const IPAdress = createSlice({
	name: "IPAdress",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});

export interface IPAdressSliceState {
	value: object;
	status: "idle" | "loading" | "failed";
}
