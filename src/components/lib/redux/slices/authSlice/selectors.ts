/* Instruments */

import { ReduxState } from "../../store";

export const selectCallbackUrl = (state: ReduxState) => state.callbackUrl.value;
