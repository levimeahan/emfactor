import login from './login';
import addEmployee from './addEmployee';

import addShift from './addShift';
import editShift from './editShift';

const mockServer = (url, data) => {
    let urlSegments = url.split('/');
    if(urlSegments[0] == "") {
        urlSegments = urlSegments.slice(1);
    }

    switch(urlSegments[0]) {
        case "login":
            return login(urlSegments.slice(1), data);
        case "employees":
            if(urlSegments.length < 2) {
                throw new Error('No page specified!');
            }

            switch(urlSegments[1]) {
                case 'add':
                    return addEmployee(data);
                default:
                    throw new Error(`Invalid page: /employees/${urlSegments[1]}`);
            }
        case "shifts":
            if(urlSegments.length < 2) {
                throw new Error('No page specified!');
            }

            switch(urlSegments[1]) {
                case 'add':
                    return addShift(data);
                case 'edit':
                    return editShift(data);
                default:
                    throw new Error(`Invalid page: /shift/${urlSegments[1]}`);
            }
        default:
            throw new Error("Invalid URL!");
    }
};



export default mockServer;