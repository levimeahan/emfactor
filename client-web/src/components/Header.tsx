import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {colors} from "../themes/default";

const Header = () => {
    return <div className={css(styles.headerContainer)}>
        <h1 className={css(styles.logo)}>Emfactor</h1>
    </div>;
};

const styles = StyleSheet.create({
    headerContainer: {
        background: colors.primaryHeaderBg,
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5px'
    },
    logo: {
        margin: '3px 5px',
        fontSize: '20px',
        fontWeight: 400,
    },
});


export default Header;