import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { colors, list as listTheme } from '../themes/default';
import listStyle from '../styles/list';

const RoleList = ({ roles }) => {
    return <div className={css(listStyle.container)}>
        <RoleDisplay
            id='ID'
            name="Roles"
            style={listStyle.header}
        />
        {roles.map((role, i) => (
            <RoleDisplay
                key={i}
                id={role.id}
                name={role.name}
            />
        ))}
    </div>;
};

const RoleDisplay = ({ id, name, style }) => (
    <div className={css(listStyle.item, listTheme.item, style)}>
        <span className={css(styles.id)}>{id}</span>
        <span className={css(styles.name)}>{name}</span>
    </div>
);
RoleDisplay.defaultProps = {
    style: null,
};

const styles = StyleSheet.create({
    id: {
        flexBasis: '50px',
        flexShrink: 0,
    },
    name: {
        flexBasis: '200px',
    },
    roles: {
        flexBasis: '100px',
    },
});

export default RoleList;