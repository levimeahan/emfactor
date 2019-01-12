import React, { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import Login from './pages/Login';
import Header from './components/Header';
import AppRouter from './AppRouter';
import StoreContext from './StoreContext';
import { selectors } from 'emfactor-client-core';
import { colors } from './themes/default';


function App() {
    const state = useContext(StoreContext);

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
        textAlign: "center",

        backgroundColor: colors.primaryBg,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "calc(16px)",
        color: colors.primaryText,
    },
});

export default App;
