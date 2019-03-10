/*
This is the network layer responsible for handling all communication to/from the server.
*/


class Network {
    errors: string[];

    constructor() {
        this.errors = [];
    }

    async post(url: string, data: object) {
        try {

        } catch(e) {
            this.errors.push(e);
            throw new Error(e);
        }
    }

    getLastError() {
        return this.errors.pop();
    }


}

const network = new Network();

export default network;