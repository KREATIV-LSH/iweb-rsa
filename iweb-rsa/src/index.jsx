import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import Article from "./Article";
import { Provider } from "react-redux";
import store from "./utils/state/store";
import Exam from "./Exam";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<App />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/exam" element={<Exam />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
