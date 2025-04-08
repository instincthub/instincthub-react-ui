/* Instruments */
import type { ReduxState } from "@/lib/redux";
export const selectActiveChannel = (state: ReduxState) =>
	state.activeChannel.value;
export const selectChannelDetails = (state: ReduxState) =>
	state.channelDetails.value;
export const selectInstructorChannelList = (state: ReduxState) =>
	state.instructorChannelList.value;
export const selectChannelHandle = (state: ReduxState) =>
	state.channelHandle.value;
