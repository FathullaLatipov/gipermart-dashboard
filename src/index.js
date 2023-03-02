import React from 'react';
import ReactDOM from 'react-dom';
import { legacy_createStore as createStore, compose, applyMiddleware } from "redux";
import App from './App';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { rootReducer } from './store';
import 'react-loading-skeleton/dist/skeleton.css'
import { ThemeProvider } from '@saleor/macaw-ui';
import "./global.css"

export const store = createStore(rootReducer, compose(applyMiddleware(thunk),
));

const root = document.getElementById('root');

const breakpoints = {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: { lg: 1680, md: 1280, sm: 600, xl: 1920, xs: 0 },
};

const themeOverrides = {
    breakpoints,
};

ReactDOM.render(
    <ThemeProvider themeOverrides={themeOverrides}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>, root
);
