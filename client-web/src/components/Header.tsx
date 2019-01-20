import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {colors} from "../themes/default";

import UserMenu from './UserMenu';

const Header = ({ userLoggedIn }) => {
    return <div className={css(styles.headerContainer)}>
        <h1 className={css(styles.logo)}><span className={css(styles.prefix)}>Em</span>factor</h1>
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
        fontWeight: 500,
    },
    prefix: {
        fontWeight: 700,
        background: colors.background.tertiaryDark,
        padding: '0 1px 2px 4px',
        margin: 'auto',
    },
});


export default Header;