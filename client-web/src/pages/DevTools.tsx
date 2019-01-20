import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { store } from 'emfactor-client-core';
import storageAvailable from '../utils/storageAvailable';
import { colors } from '../themes/default';

const canUseStorage = storageAvailable('localStorage');

const save = () => {
    if(!canUseStorage) {
        return;
    }

    let state = store.getState();

    window.localStorage.setItem('appState', JSON.stringify(state));

    console.log('saved!', state);
};

const load = () => {
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

        console.log('Loaded!', state);
    } catch(e) {
        console.log('Error loading state:', e);
    }
};

const logState = () => {
    console.log(store.getState());
};

const Button = ({ children, ...rest }) => (
    <button className={css(styles.button)} {...rest}>{children}</button>
);

const DevTools = () => {
    return <div className={css(styles.container)}>
        <h3 className={css(styles.header)}>Local Storage</h3>
        <span className={css(styles.label)}>(Open console for result info)</span>
        <Button onClick={save} disabled={!canUseStorage}>Save State</Button>
        <Button onClick={load} disabled={!canUseStorage}>Load State</Button>

        <h3>State</h3>
        <Button onClick={logState}>Log to Console</Button>
    </div>;
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        margin: '4px',
    },
    label: {
        fontSize: '12px',
        fontStyle: 'italic',
        /*textTransform: 'uppercase',*/
        color: colors.text.medium,
    },
    button: {
        margin: '5px',
        cursor: 'pointer',
    }
});

export default DevTools;