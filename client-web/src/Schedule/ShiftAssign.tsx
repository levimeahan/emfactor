import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import {Employee} from 'emfactor-client-core';
import {DeepReadonly} from "../../../client-core/src/types";

// Employee
interface ShiftAssignProps {
    employeeId: number;
    employeeOptions: DeepReadonly<Employee[]>;
    assign: (employeeId: number) => void;
}

const ShiftAssign = ({ employeeId, employeeOptions, assign }: ShiftAssignProps) => {
    return <select
        value={employeeId ? employeeId : '0'}
        onChange={e => assign(parseInt(e.currentTarget.value))}
    >
        <option value='0'>None</option>
        {employeeOptions.map((employee, i) =>
            <option key={i} value={employee.id}>{employee.firstName} {employee.lastName}</option>
        )}
    </select>;
};

const styles = StyleSheet.create({});

export default ShiftAssign;