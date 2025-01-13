import { configureStore } from "@reduxjs/toolkit";
import quizzesReducer from "./quizReducer";

export default configureStore({
    reducer: {
        quizzes: quizzesReducer,
    },
});
