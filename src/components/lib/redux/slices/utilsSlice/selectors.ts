/* Instruments */
import type { ReduxState } from "@/components/lib/redux/store";
export const selectScreenSize = (state: ReduxState) => state.screenSize.value;
