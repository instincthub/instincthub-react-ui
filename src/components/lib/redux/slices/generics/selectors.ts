/* Instruments */
import { ReduxState } from "../../store";

export const selectObjectSlice = (state: ReduxState) => state.objectSlice.value;
export const selectArraySlice = (state: ReduxState) => state.arraySlice.value;
