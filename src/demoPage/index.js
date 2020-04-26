import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import DemoPage from "./components/DemoPage/component";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const demoPage = (
    <Provider store={configureStore()}>
        <DemoPage />
    </Provider>
);

ReactDOM.render(demoPage, document.getElementById("root"));