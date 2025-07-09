/* Core */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Answer, CourseFilterSubjectSliceState, Question } from "@/types/redux";

const initialState: CourseFilterSubjectSliceState = {
  value: [],
  status: "idle",
  id: "",
};

export const stepQuestions = createSlice({
  name: "stepQuestions",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Question[]>) => {
      state.value = action.payload;
    },
    increment: (state, action: PayloadAction<Question>) => {
      state.value.unshift(action.payload);
    },
    decrement: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
    answer: (
      state,
      action: PayloadAction<{ question: string; answer: Answer }>
    ) => {
      const { question, answer } = action.payload;

      state.value = state.value.map((item) => {
        if (item.id === question) {
          return {
            ...item,
            answers: [answer, ...item.answers],
          };
        }
        return item;
      });
    },
    likeQuestion: (
      state,
      action: PayloadAction<{
        question: string;
        id: Answer;
        toggle: boolean;
        types: string;
      }>
    ) => {
      const { question, id, toggle, types } = action.payload;
      state.value = state.value.map((item) => {
        if (item.id === question) {
          return {
            ...item,
            // user_liked: toggle ? id : "",
            // likes: toggle ? item.likes + 1 : item.likes - 1,
            [item[types as keyof Question] as number]: toggle
              ? (item[types as keyof Question] as number) + 1
              : (item[types as keyof Question] as number) - 1,
            [types === "likes" ? "user_liked" : "user_disliked"]: toggle
              ? id
              : null,
          };
        }
        return item;
      });
    },
    likeAnswer: (
      state,
      action: PayloadAction<{
        answer_question_id: string;
        answer: string;
        id: Answer;
        toggle: boolean;
        types: string;
      }>
    ) => {
      const { answer_question_id, answer, id, toggle, types } = action.payload;

      state.value = state.value.map((item) => {
        if (item.id === answer_question_id) {
          const updatedAnswers = item.answers.map((ans) => {
            if (ans.id === answer) {
              return {
                ...ans,
                [item[types as keyof Question] as number]: toggle
                  ? (item[types as keyof Question] as number) + 1
                  : (item[types as keyof Question] as number) - 1,
                [types === "likes" ? "user_liked" : "user_disliked"]: toggle
                  ? id
                  : null,
                // user_liked: toggle ? id : null,
                // likes: toggle ? ans.likes + 1 : ans.likes - 1,
              };
            }
            return ans;
          });

          return {
            ...item,
            answers: updatedAnswers,
          };
        }
        return item;
      });
    },
  },
});
