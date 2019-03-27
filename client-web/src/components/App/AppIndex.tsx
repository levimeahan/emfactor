import React, { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import 'react-dates/initialize';

import Login from '../../pages/Login';
import Header from '../Header';
import AppRouter from './AppRouter';
import { selectors } from 'emfactor-client-core';

import useAppState from '../../hooks/useAppState';

import { colors } from '../../themes/default';


function AppIndex() {
    const state = useAppState();

    return <div className={css(styles.appContainer)}>
        <Header userLoggedIn={selectors.userLoggedIn(state)} />
        {selectors.userLoggedIn(state) ?
            <AppRouter />
            :
            <Login />
        }
    </div>;
}

const styles = StyleSheet.create({
    appContainer: {
        margin: 0,
        padding: 0,

        backgroundColor: colors.primaryBg,
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
        display: "flex",
        flexDirection: "column",
        fontSize: "calc(16px)",
        color: colors.primaryText,
    },
});

export default AppIndex;
