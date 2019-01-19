import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {colors} from "../themes/default";

import UserMenu from './UserMenu';

const Header = ({ userLoggedIn }) => {
    return <div className={css(styles.headerContainer)}>
        <h1 className={css(styles.logo)}>Emfactor</h1>
        {userLoggedIn ?
            <UserMenu />
        : null}
    </div>;
};


const styles = StyleSheet.create({
    headerContainer: {
        background: colors.background.tertiary,
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px',
        borderBottom: `1px solid ${colors.background.tertiaryDark}`
    },
    logo: {
        margin: '3px 5px',
        fontSize: '20px',
        fontWeight: 400,
    },
});


export default Header;