import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { actions } from 'emfactor-client-core';

const UserMenu = () => {
    return <div className={css(styles.container)}>
        <button onClick={actions.logout}>Logout</button>
    </div>;
};

const styles = StyleSheet.create({
    container: {
        marginRight: '5px'
    }
});

export default UserMenu;