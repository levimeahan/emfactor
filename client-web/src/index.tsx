import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App/App';

import { store } from 'emfactor-client-core';

import {canUseStorage, loadState, resetState, saveState} from "./utils/stateDevTools";

if(canUseStorage) {
    loadState();
    store.subscribe(saveState);
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);