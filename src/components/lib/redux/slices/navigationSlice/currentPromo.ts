/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: currentPromoSliceState = {
	value: {
		toggle: true,
		use: "app",
	},
	status: "idle",
};

export const currentPromo = createSlice({
	name: "currentPromo",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<object>) => {
			state.value = action.payload;
		},
	},
});

export interface currentPromoSliceState {
	value: object;
	status: "idle" | "loading" | "failed";
}
