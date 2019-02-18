import {Employee} from "../types";

export const fullName = (employee: Employee) => `${employee.firstName} ${employee.lastName}`;