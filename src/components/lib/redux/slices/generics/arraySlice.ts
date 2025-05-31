import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ArrayState<T = any> {
  value: T[];
  status: "idle" | "loading" | "failed";
}

const initialState: ArrayState = {
  value: [],
  status: "idle",
};

export const arraySlice = createSlice({
  name: "array",
  initialState,
  reducers: {
    setArray(state, action: PayloadAction<any[]>) {
      state.value = action.payload;
    },
    addToArray(state, action: PayloadAction<any>) {
      state.value.push(action.payload);
    },
    removeFromArray(state, action: PayloadAction<number>) {
      state.value.splice(action.payload, 1);
    },
    clearArray(state) {
      state.value = [];
    },
    updateInArray(state, action: PayloadAction<{ index: number; value: any }>) {
      const { index, value } = action.payload;
      if (index >= 0 && index < state.value.length) {
        state.value[index] = value;
      }
    },
  },
});

export const {
  setArray,
  addToArray,
  removeFromArray,
  clearArray,
  updateInArray,
} = arraySlice.actions;

export type { ArrayState };
