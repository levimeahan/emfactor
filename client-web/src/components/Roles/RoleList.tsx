import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Link } from 'react-router-dom';

import {colors, linkThemes, list as listTheme} from '../../themes/default';
import listStyle from '../../styles/list';

const RoleList = ({ roles, editPath }) => {
    return <div className={css(listStyle.container)}>
        <RoleDisplay
            id='ID'
            name="Roles"
            style={listStyle.header}
            editPath={null}
        />
        {roles.map((role, i) => (
            <RoleDisplay
                key={i}
                id={role.id}
                name={role.name}
                editPath={editPath}
            />
        ))}
    </div>;
};

const RoleDisplay = ({ id, name, style, editPath }) => (
    <div className={css(listStyle.item, listTheme.item, style)}>
        <span className={css(styles.id)}>{id}</span>
        <span className={css(styles.name)}>{name}</span>
        <div className={css(styles.editButtonContainer)}>
            {editPath ?
                <Link to={`${editPath}/${id}`} className={css(linkThemes.standard)}>Edit</Link>
            : null}
        </div>
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
    editButtonContainer: {
        flexBasis: '50px',
        flexShrink: 0,
    },
});

export default RoleList;