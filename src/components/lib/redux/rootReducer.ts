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
} from "./slices";
import { channelCallbackUrl } from "./slices/authSlice";
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
  statusMessageState: statusMessageState.reducer,
  courseOverview: courseOverview.reducer,
  confirmDelete: confirmDelete.reducer,
  IPAdress: IPAdress.reducer,

  courseModules: courseModules.reducer,
  activeChannel: activeChannel.reducer,

  // cohorts
  toggleCreateCohort: toggleCreateCohort.reducer,

  // Channel
  channelDetails: channelDetails.reducer,
  instructorChannelList: instructorChannelList.reducer,
  channelHandle: channelHandle.reducer,
};
