declare class Network {
    errors: string[];
    constructor();
    post(url: any, data: any): Promise<{
        loginOk: boolean;
        errorMessage: string;
        employee?: undefined;
    } | {
        loginOk: boolean;
        errorMessage: string;
        employee: import("./types").Employee;
    }>;
    getLastError(): string;
}
declare const network: Network;
export default network;
