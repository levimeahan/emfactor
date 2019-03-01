import {DeepReadonly, Employee} from "../types";

export const fullName = (employee: DeepReadonly<Employee>) => `${employee.firstName} ${employee.lastName}`;