import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();
//console.log('Initial state: ', store.getState())

store.subscribe((): void => {
    //console.log('State after dispatch: ', store.getState())

    //test
    //window.localStorage.setItem('token', store.getState().authReducer.token ?? '')
})

root.render(
    <Provider store={ store }>
        {/* <BrowserRouter basename='/'> */ }
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
