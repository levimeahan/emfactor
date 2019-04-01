import React, { useEffect, useRef } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { withRouter } from 'react-router-dom';


import {colors} from "../../themes/default";
import NavMenu from "./NavMenu";
import {MenuMode, MenuStatusValue, PageRoute} from "../../types";

interface AppMenuProps {
    status: MenuStatusValue;
    mode: MenuMode;
    routes: PageRoute[];
    managerRoutes: PageRoute[]|null;
    closeMenu: Function;
    location: {
        pathname: string;
    };
}
const AppMenu = ({ status, mode, routes, managerRoutes, closeMenu, location }: AppMenuProps) => {
    let menuStyles = [styles.navContainer];
    if (mode === 'FIXED') {
        menuStyles.push(styles.fixedNav)
    }
    else {
        menuStyles.push(styles.toggleNav);

        if (status === 'OPEN') {
            menuStyles.push(styles.toggleOpen);
        }
        else {
            menuStyles.push(styles.toggleClosed);
        }
    }

    const locationRef = useRef(location.pathname);

    useEffect(() => {
        if(location.pathname !== locationRef.current) {
            locationRef.current = location.pathname;
            if(mode === 'TOGGLE') {
                closeMenu();
            }
        }
    });

    return <nav className={css(...menuStyles)}>
        <NavMenu routes={routes} />
        {managerRoutes ?
            <React.Fragment>
                <h3 className={css(styles.navMenuHeader)}>Manage</h3>
                <NavMenu routes={managerRoutes} />
            </React.Fragment>
            : null}
    </nav>;
};

const styles = StyleSheet.create({
    navContainer: {
        width: '11em',
        flexShrink: 0,

        position: 'relative',
        zIndex: 5,

        background: colors.background.secondary,
        margin: 0,
        padding: 0,
        borderRight: `1px solid ${colors.background.secondaryLight}`,

        boxShadow: '1px 0 6px #202020',
    },

    fixedNav: {

    },
    toggleNav: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        transition: 'transform linear 100ms',
    },
    toggleOpen: {
        transform: 'translate3d(0, 0, 0)'
    },
    toggleClosed: {
        transform: 'translate3d(-11em, 0, 0)'
    },

    navMenuHeader: {
        margin: '6px 0 0',
        padding: '2px 0 4px',

        fontSize: '18px',
        fontWeight: 'normal',
        background: colors.background.secondaryDark,
        borderTop: `1px solid ${colors.background.secondaryLight}`,
        borderBottom: `1px solid ${colors.background.secondaryLight}`,
    },
});

export default withRouter(AppMenu);