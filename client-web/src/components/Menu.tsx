import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';

import {colors} from "../themes/default";

const Menu = ({ routes, containerStyle }) => {
    return <nav className={css(styles.menuContainer, containerStyle)}>
        <ul className={css(styles.menu)}>
            {routes.map((route, i) => (
                <li key={i} className={css(styles.navItem)}>
                    <Link to={route.path} className={css(styles.navLink)}>{route.name}</Link>
                </li>
            ))}
        </ul>
    </nav>
};

const styles = StyleSheet.create({
    menuContainer: {
        background: colors.secondaryBg,
        margin: 0,
        padding: '0 15px 0 5px',
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 0,
        padding: '5px',
    },
    navItem: {
        alignSelf: 'stretch',
        listStyle: 'none',
        padding: '8px 0',
    },
    navLink: {
        display: 'block',
        width: '100%',
        textAlign: 'left',
        textDecoration: 'none',
        textTransform: "capitalize",
        color: colors.primaryLink,
        fontSize: '16px',
        ':hover': {
            color: colors.primaryHover
        },
    },
});

export default Menu;
