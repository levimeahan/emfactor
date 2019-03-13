export type ScheduleMode = "EDIT" | "ASSIGN" | "DISPLAY";

export interface ScheduleDayActions {
    addShift: () => void;
    editShift: (shiftId: number, baseShiftId: number, changedData: any) => void;
    assignShift: (shiftId, baseShiftId, employeeId) => void;
}

export interface InputStateManager<T = any> {
    value: T;
    onChange: (newValue: T) => void;
}

export interface InputItem {
    name: string;
    label: string;
    value: number|string|boolean|object;
}

export interface InputCheckboxItem extends InputItem {
    checked: boolean;
}

export interface ObjectInputStateManager {
    options: InputItem[],
    value: {
        [key: string]: any;
    };
    onChange: (name, newValue) => void;
}

export interface FormCheckboxGroupManager {
    options: InputCheckboxItem[],
    value: Array<any>,
    onChange: (index: number, checked: boolean) => void;
}