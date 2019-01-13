import login from './login';

const mockServer = (url, data) => {
    let urlSegments = url.split('/');
    if(urlSegments[0] == "") {
        urlSegments = urlSegments.slice(1);
    }

    switch(urlSegments[0]) {
        case "login":
            return login(data);
        default:
            throw new Error("Invalid URL!");
    }
};



export default mockServer;