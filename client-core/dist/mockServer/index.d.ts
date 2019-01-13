declare const mockServer: (url: any, data: any) => {
    loginOk: boolean;
    errorMessage: string;
    employee?: undefined;
} | {
    loginOk: boolean;
    errorMessage: string;
    employee: import("../store/schema").Employee;
};
export default mockServer;
