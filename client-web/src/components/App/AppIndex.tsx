import React, { useState, useContext } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import 'react-dates/initialize';

import Login from '../../pages/Login';
import Header from '../Header';
import AppRouter from './AppRouter';
import { selectors } from 'emfactor-client-core';

import useAppState from '../../hooks/useAppState';

import { colors } from '../../themes/default';
import useWindowSize from "../../hooks/useWindowSize";

import { MenuMode, MenuStatusValue } from "../../types";

type MenuStatusManager = [MenuStatusValue, (MenuStatusValue) => void];

function AppIndex() {
    const state = useAppState();
    const windowSize = useWindowSize();

    let [menuStatus, setMenuStatus] = useState('CLOSED') as MenuStatusManager;

    let menuMode: MenuMode = windowSize.innerWidth > 1000 ? 'FIXED' : 'TOGGLE';

    return <div className={css(styles.appContainer)}>
        <Header
            userLoggedIn={selectors.userLoggedIn(state)}
            menuStatus={menuStatus}
            menuMode={menuMode}
            toggleMenu={() => setMenuStatus(menuStatus === 'OPEN' ? 'CLOSED' : 'OPEN')}
        />
        {selectors.userLoggedIn(state) ?
            <AppRouter
                menuStatus={menuStatus}
                menuMode={menuMode}
                closeMenu={() => setMenuStatus('CLOSED')}
                userIsManager={selectors.userIsManager(state)}
            />
            :
            <Login />
        }
    </div>;
}

const styles = StyleSheet.create({
    appContainer: {
        margin: 0,
        padding: 0,
        position: 'relative',

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
