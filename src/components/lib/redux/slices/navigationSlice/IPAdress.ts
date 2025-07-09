/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IPAdressSliceState } from "@/types/redux";

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
