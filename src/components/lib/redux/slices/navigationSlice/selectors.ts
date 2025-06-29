/* Instruments */
import { ReduxState } from "../../store";

export const selectAppToggle = (state: ReduxState) => state.appToggle.value;
export const selectToggleCreateCourse = (state: ReduxState) =>
  state.toggleCreateCourse.value;
export const selectToggleCreateCohort = (state: ReduxState) =>
  state.toggleCreateCohort.value;
export const selectToggleCreateTrack = (state: ReduxState) =>
  state.toggleCreateCohort.value;
export const selectConfirmDelete = (state: ReduxState) =>
  state.confirmDelete.value;
export const selectIPAdress = (state: ReduxState) => state.IPAdress?.value;
export const selectSettingsToggle = (state: ReduxState) =>
  state.settingsToggle.value;
export const selectUserLocation = (state: ReduxState) => state.userLocation.value;
export const selectSearchValue = (state: ReduxState) => state.searchValue.value;
export const selectCurrentPromo = (state: ReduxState) => state.currentPromo.value;
export const selectCourseNextStep = (state: ReduxState) => state.courseNextStep.value;