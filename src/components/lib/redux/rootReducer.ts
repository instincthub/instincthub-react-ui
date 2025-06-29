/* Instruments */
import {
  courseFilterSubject,
  courseFilterLevel,
  courseFilterDuration,
  courseSearch,
  stepQuestions,
  stepContent,
  videoTimestamp,
  videoTimestampObject,
  appToggle,
  toggleCreateCourse,
  courseModules,
  activeChannel,
  toggleCreateCohort,
  courseOverview,
  statusMessageState,
  channelDetails,
  instructorChannelList,
  channelHandle,
  confirmDelete,
  IPAdress,
  objectSlice,
  arraySlice,
  feedbackToggle,
  settingsToggle,
  userLocation,
  searchValue,
  currentPromo,
  courseNextStep,
  selectedCourses,
  screenSize,
  channelCallbackUrl,
} from "./slices";
import { courseDetails } from "./slices/courseSlice/courseDetails";

export const reducer = {
  objectSlice: objectSlice.reducer,
  arraySlice: arraySlice.reducer,

  // course
  subjects: courseFilterSubject.reducer,
  levels: courseFilterLevel.reducer,
  durations: courseFilterDuration.reducer,
  courseSearch: courseSearch.reducer,
  callbackUrl: channelCallbackUrl.reducer,
  stepQuestions: stepQuestions.reducer,
  stepContent: stepContent.reducer,
  courseDetails: courseDetails.reducer,
  videoTimestamp: videoTimestamp.reducer,
  videoTimestampObject: videoTimestampObject.reducer,

  // navigation
  appToggle: appToggle.reducer,
  toggleCreateCourse: toggleCreateCourse.reducer,
  courseOverview: courseOverview.reducer,
  confirmDelete: confirmDelete.reducer,
  IPAdress: IPAdress.reducer,
  settingsToggle: settingsToggle.reducer,
  userLocation: userLocation.reducer,
  searchValue: searchValue.reducer,
  currentPromo: currentPromo.reducer,
  courseNextStep: courseNextStep.reducer,
  selectedCourses: selectedCourses.reducer,
  courseModules: courseModules.reducer,
  activeChannel: activeChannel.reducer,

  // cohorts
  toggleCreateCohort: toggleCreateCohort.reducer,

  // Channel
  channelDetails: channelDetails.reducer,
  instructorChannelList: instructorChannelList.reducer,
  channelHandle: channelHandle.reducer,

  // Message
  feedbackToggle: feedbackToggle.reducer,
  statusMessageState: statusMessageState.reducer,

  // utilsSlice
  screenSize: screenSize.reducer,
};
