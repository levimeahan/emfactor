import { store } from 'emfactor-client-core';

import storageAvailable from '../utils/storageAvailable';

export const canUseStorage = storageAvailable('localStorage');

export const saveState = () => {
    if(!canUseStorage) {
        return;
    }

    let state = store.getState();

    window.localStorage.setItem('appState', JSON.stringify(state));

    console.log('saved!', state);
};

export const loadState = () => {
    if(!canUseStorage) {
        return;
    }

    let storedState = window.localStorage.getItem('appState');

    if(!storedState) {
        return;
    }
    try {
        let state = JSON.parse(storedState);

        store.initialize(state);
        store.updateSubscribers();

        console.log('Loaded!', state);
    } catch(e) {
        console.log('Error loading state:', e);
    }
};

export const resetState = () => {
    store.initialize(store.defaultState);
    store.updateSubscribers();
    console.log('Reset!', store.getState());
};
export const logState = () => {
    console.log(store.getState());
};