import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { actions } from 'emfactor-client-core';
import { colors } from '../themes/default';

const UserMenu = () => {
    return <div className={css(styles.container)}>
        <button onClick={actions.logout} className={css(styles.logoutButton)}>Logout</button>
    </div>;
};

const styles = StyleSheet.create({
    container: {
        marginRight: '5px'
    },
    logoutButton: {
        fontSize: '14px',
        background: 'none',
        color: colors.text.semiBright,
        fontWeight: 'bold',
        border: 'none',
        padding: '4px 7px',
        marginRight: '1px',
        cursor: 'pointer',
        transition: 'color linear 60ms',
        ':hover': {
            color: colors.text.semiDark,
            cursor: 'pointer',
        },
    },
});

export default UserMenu;