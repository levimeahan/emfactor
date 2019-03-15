import React from 'react';
import { css } from 'aphrodite/no-important';

import styles from './scheduleShiftStyles';

// Roles
const ShiftRoleEdit = ({ currentRole, allRoles, onChange }) => {
    return <div className={css(styles.nameInputContainer)}>
        <label className={css(styles.nameInputLabel)}>Role</label>
        <select
            name="role"
            value={currentRole}
            onChange={e => onChange([e.currentTarget.value])}
            className={css(styles.nameInput)}
        >
            <option key={0} value={0}>None</option>
            {allRoles.map((role, i) => (
                <option key={i} value={role.id}>{role.name}</option>
            ))}
        </select>
    </div>;
};

export default ShiftRoleEdit;