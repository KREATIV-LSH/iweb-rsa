import { createSlice } from "@reduxjs/toolkit";

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState: {
        pastResults: [],
    },
    reducers: {
        addQuiz(state, action) {
            state.pastResults.push(action.payload);
            console.log(state, action);
        },
    },
});

export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;