export interface Answer {
  id: string;
  // Add other properties for the answer here
  likes: number;
  types: string;
  dislikes: number;
}

export interface Question {
  id: string;
  answers: Answer[]; // Define answers as an array of Answer objects
  likes: number;
  types: string;
  // Add other properties for the question here
}

export interface CourseFilterSubjectSliceState {
  value: Question[];
  status: "idle" | "loading" | "failed";
  id: string;
}

export interface CourseModule {
  id: string;
  title: string;
  // Other properties of the module object
}

export interface CourseModulesSliceState {
  value: CourseModule[];
  status: "idle" | "loading" | "failed";
}

export interface courseDetailsSliceState {
  value: object;
  status: "idle" | "loading" | "failed";
  id: string;
}

export interface courseFilterDurationSliceState {
  value: string[];
  status: "idle" | "loading" | "failed";
}

export interface courseFilterLevelSliceState {
  value: string[];
  status: "idle" | "loading" | "failed";
}

export interface courseFilterSubjectSliceState {
  value: number[];
  status: "idle" | "loading" | "failed";
}

export interface courseOverviewSliceState {
  value: object;
  status: "idle" | "loading" | "failed";
  id: string;
}

export interface courseSearchSliceState {
  value: string;
  status: "idle" | "loading" | "failed";
}

export interface stepContentSliceState {
  value: object;
  status: "idle" | "loading" | "failed";
  id: string;
}

export interface videoTimestampSliceState {
  value: object;
  status: "idle" | "loading" | "failed";
}

export interface videoTimestampObjectSliceState {
  value: object;
  status: "idle" | "loading" | "failed";
}

export interface channelDetailsSliceState {
  value: object;
  status: "idle" | "loading" | "failed";
  id: string;
}

export interface instructorChannelListSliceState {
  value: string[];
  status: "idle" | "loading" | "failed";
  id: string;
}

export interface IPAdressSliceState {
	value: object;
	status: "idle" | "loading" | "failed";
}
