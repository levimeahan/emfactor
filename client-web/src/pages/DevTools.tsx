import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { colors } from '../themes/default';

import { canUseStorage, saveState, loadState, resetState, logState } from '../utils/stateDevTools';

const Button = ({ children, ...rest }) => (
    <button className={css(styles.button)} {...rest}>{children}</button>
);

const DevTools = () => {
    return <div className={css(styles.container)}>
        <h2 className={css(styles.header)}>Local Storage</h2>
        <span className={css(styles.label)}>Note: Resets after 24 hours of inactivity</span>
        <span className={css(styles.label)}>(Open console for result info)</span>
        <Button onClick={saveState} disabled={!canUseStorage}>Save State</Button>
        <Button onClick={loadState} disabled={!canUseStorage}>Load State</Button>

        <h2>State</h2>
        <Button onClick={resetState}>Reset to Default</Button>
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
        minWidth: '110px',
        margin: '6px',
        padding: '3px 2px',
        cursor: 'pointer',
    }
});

export default DevTools;