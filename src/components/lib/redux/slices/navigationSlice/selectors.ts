/* Instruments */
import { ReduxState } from "../../store";

export const selectAppToggle = (state: ReduxState) => state.appToggle.value;
export const selectToggleCreateCourse = (state: ReduxState) =>
  state.toggleCreateCourse.value;
export const selectToggleCreateCohort = (state: ReduxState) =>
  state.toggleCreateCohort.value;
export const selectToggleCreateTrack = (state: ReduxState) =>
  state.toggleCreateCohort.value;
export const selectStatusMessageState = (state: ReduxState) =>
  state.statusMessageState.value;
export const selectConfirmDelete = (state: ReduxState) =>
  state.confirmDelete.value;
export const selectIPAdress = (state: ReduxState) => state.IPAdress?.value;
