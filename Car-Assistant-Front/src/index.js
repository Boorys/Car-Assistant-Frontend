import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import AppContainer from './layouts/App';
import { store } from "./store";
import { Provider } from "react-redux";


ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById("root")
);