import React, { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Login from './pages/Login.tsx';

import AppRouter from './AppRouter';
import StoreContext from './StoreContext.js';
import { userLoggedIn } from 'emfactor-client-core/selectors';


function App() {
    const state = useContext(StoreContext);

    return <div className={css(styles.appContainer)}>
        {userLoggedIn(state) ? <AppRouter /> : <Login />}
    </div>;
}

const styles = StyleSheet.create({
    appContainer: {
        margin: 0,
        padding: 0,
        textAlign: "center",

        backgroundColor: "#282c34",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(10px + 2vmin)",
        color: "white",
    },
});

export default App;
