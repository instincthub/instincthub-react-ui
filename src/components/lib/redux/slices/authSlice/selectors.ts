/* Instruments */
import type { ReduxState } from "@/lib/redux";
export const selectCallbackUrl = (state: ReduxState) => state.callbackUrl.value;
