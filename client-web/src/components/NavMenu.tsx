import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import NavMenuLink from './NavMenuLink';

const NavMenu = ({ routes }) => {
    return <ul className={css(styles.menu)}>
        {routes.map((route, i) => (
            <NavMenuLink key={i} route={route} />
        ))}
    </ul>;
};

const styles = StyleSheet.create({
    menu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 0,
        padding: 0,
    },
});

export default NavMenu;
