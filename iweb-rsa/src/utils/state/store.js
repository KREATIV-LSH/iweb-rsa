import { configureStore } from "@reduxjs/toolkit";
import quizzesReducer from "./quizReducer";

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("reduxState", serializedState);
    } catch (e) {
        console.error("Could not save state", e);
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("reduxState");
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (e) {
        console.error("Could not load state", e);
        return undefined;
    }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
    reducer: {
        quizzes: quizzesReducer,
    },
    preloadedState: persistedState,
});

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;
