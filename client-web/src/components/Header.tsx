import React from 'react';
import { StyleSheet, css } from '../utils/aphroditeWithChildSelectors';
import {colors} from "../themes/default";

import UserMenu from './UserMenu';

const Header = ({ userLoggedIn, menuMode, menuStatus, toggleMenu }) => {
    return <header className={css(styles.headerContainer)}>
        {menuMode === 'TOGGLE' ?
            <MenuToggle
                menuStatus={menuStatus}
                toggleMenu={toggleMenu}
            />
        : null}
        <h1 className={css(styles.logo)}><span className={css(styles.prefix)}>Em</span>factor</h1>
        {userLoggedIn ?
            <UserMenu />
        : null}
    </header>;
};

const menuToggleStyles = {
    color: colors.text.semiBright,
};
const MenuToggle = ({ menuStatus, toggleMenu }) => (
    <button className={css(styles.menuToggleButton)} onClick={toggleMenu}>
        {menuStatus === 'OPEN' ?
            <XIcon/>
            :
            <HamburgerIcon/>
        }
    </button>
);

const HamburgerIcon = () => (
    <svg width="24" height="24" version="1.1">
        <line x1="2" x2="22" y1="4" y2="4" strokeWidth="3" />
        <line x1="2" x2="22" y1="12" y2="12" strokeWidth="3" />
        <line x1="2" x2="22" y1="20" y2="20" strokeWidth="3" />
    </svg>
);
const XIcon = () => (
    <svg width="24" height="24" version="1.1">
        <line x1="2" y1="2" x2="22" y2="22" strokeWidth="3" />
        <line x1="22" y1="2" x2="2" y2="22" strokeWidth="3" />
    </svg>
);

const styles = StyleSheet.create({
    headerContainer: {
        position: 'relative',
        zIndex: 10,
        background: colors.background.tertiary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0',
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

    menuToggleButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        '&line': {
            stroke: colors.text.semiBright,
        },
        ':hover': {
            '&line': {
                stroke: colors.text.dark,
            }
        },
    },
});


export default Header;