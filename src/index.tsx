import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./main/ui/app/App";
import { store } from "./main/bll/store";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <HashRouter basename={"/"}>
            <Provider store={store}>
                <App />
            </Provider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
