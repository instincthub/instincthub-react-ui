import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ObjectState {
  value: Record<string, any>;
  status: "idle" | "loading" | "failed";
}

const initialState: ObjectState = {
  value: {},
  status: "idle",
};

export const objectSlice = createSlice({
  name: "object",
  initialState,
  reducers: {
    setObject(state, action: PayloadAction<Record<string, any>>) {
      state.value = action.payload;
    },
    updateObject(state, action: PayloadAction<Partial<Record<string, any>>>) {
      state.value = { ...state.value, ...action.payload };
    },
    clearObject(state) {
      state.value = {};
    },
  },
});

export const { setObject, updateObject, clearObject } = objectSlice.actions;
export type { ObjectState };
