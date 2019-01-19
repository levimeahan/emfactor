import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';

import {colors} from "../themes/default";

const NavMenu = ({ routes, containerStyle }) => {
    return <nav className={css(styles.menuContainer, containerStyle)}>
        <ul className={css(styles.menu)}>
            {routes.map((route, i) => (
                <li key={i} className={css(styles.navItem)}>
                    <NavLink
                        to={route.path}
                        className={css(styles.navLink)}
                        activeClassName={css(styles.activeNavLink)}
                    >{route.name}</NavLink>
                </li>
            ))}
        </ul>
    </nav>
};

const styles = StyleSheet.create({
    menuContainer: {
        background: colors.background.secondary,
        margin: 0,
        padding: 0,
        borderRight: `1px solid ${colors.background.secondaryDark}`
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 0,
        padding: 0,
    },
    navItem: {
        alignSelf: 'stretch',
        listStyle: 'none',
        padding: '0',
    },
    navLink: {
        display: 'block',
        background: colors.background.secondary,
        textAlign: 'left',
        textDecoration: 'none',
        textTransform: "capitalize",
        padding: '6px 12px 6px 8px',
        color: colors.text.semiBright,
        fontSize: '16px',
        transition: 'color linear 150ms, background linear 150ms',
        ':hover': {
            color: colors.text.bright,
            background: colors.background.secondaryLight,
        },
    },
    activeNavLink: {
        background: colors.background.secondaryDark,
        ':hover': {
            cursor: 'default',
            color: colors.text.semiBright,
            background: colors.background.secondaryDark,
        },
    },
});

export default NavMenu;
