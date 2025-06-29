/* Instruments */
import type { ReduxState } from "@/components/lib/redux/store";
export const selectFeedbackToggle = (state: ReduxState) =>
  state.feedbackToggle.value;

export const selectStatusMessageState = (state: ReduxState) =>
  state.statusMessageState.value;
