import { State, Employee } from '../store/schema';
interface DbEmployee extends Employee {
    password: string;
}
interface Database extends State {
    employees: {
        byId: {
            [key: number]: DbEmployee;
        };
        allIds: number[];
    };
}
declare const database: Database;
export default database;
