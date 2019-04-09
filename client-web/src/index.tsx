import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App/App';

import { store } from 'emfactor-client-core';

import {canUseStorage, loadState, resetState, saveState} from "./utils/stateDevTools";

if(canUseStorage) {
    let lastVisit = window.localStorage.getItem('lastVisit');

    // Clear local storage cache every day to avoid stale data
    if(lastVisit === null || parseInt(lastVisit) > Date.now() - (86400000)) {
        loadState();
        store.dispatch(prevState => ({
            ...prevState,
            app: {
                ...prevState.app,
                errorMessage: '',
            }
        }));
    }
    else {
        saveState();
    }

    store.subscribe(saveState);

    window.localStorage.setItem('lastVisit', String(Date.now()));
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);