/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: CallbackUrlSliceState = {
	value: "",
	status: "idle",
};

export const channelCallbackUrl = createSlice({
	name: "callbackUrl",
	initialState,
	reducers: {
		setUrl: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

export interface CallbackUrlSliceState {
	value: string;
	status: "idle" | "loading" | "failed";
}
