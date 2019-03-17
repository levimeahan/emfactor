import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import {Employee} from 'emfactor-client-core';
import {DeepReadonly} from "../../../../client-core/src/types/index";

// Employee
interface ShiftAssignProps {
    employeeId: number;
    employeeOptions: DeepReadonly<Employee[]>;
    assign: (employeeId: number) => void;
    extraStyles: React.CSSProperties;
}

const ShiftAssign = ({ employeeId, employeeOptions, assign, extraStyles }: ShiftAssignProps) => {
    return <select
        value={employeeId ? employeeId : '0'}
        onChange={e => assign(parseInt(e.currentTarget.value))}
        className={css(styles.employeeSelect, extraStyles)}
    >
        <option value='0'>None</option>
        {employeeOptions.map((employee, i) =>
            <option key={i} value={employee.id}>{employee.firstName} {employee.lastName}</option>
        )}
    </select>;
};
ShiftAssign.defaultProps = {
    extraStyles: null,
};

const styles = StyleSheet.create({
    employeeSelect: {
        width: '60%',
    },
});

export default ShiftAssign;