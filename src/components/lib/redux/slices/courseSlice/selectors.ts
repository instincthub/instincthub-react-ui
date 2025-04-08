/* Instruments */

import { ReduxState } from "../../store";

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCourseFilterSubject = (state: ReduxState) =>
	state.subjects.value;
export const selectCourseFilterLevel = (state: ReduxState) =>
	state.levels.value;
export const selectCourseFilterDuration = (state: ReduxState) =>
	state.durations.value;
export const selectCourseSearch = (state: ReduxState) =>
	state.courseSearch.value;
export const selectStepQuestions = (state: ReduxState) =>
	state.stepQuestions.value;
export const selectStepContent = (state: ReduxState) => state.stepContent.value;
export const selectCourseDetails = (state: ReduxState) =>
	state.courseDetails.value;
export const selectVideoTimestamp = (state: ReduxState) =>
	state.videoTimestamp.value;

// Creator
export const selectVideoTimestampObject = (state: ReduxState) =>
	state.videoTimestampObject.value;
export const selectCourseModules = (state: ReduxState) =>
	state.courseModules.value;
export const selectCourseOverview = (state: ReduxState) =>
	state.courseOverview.value;
