import login from './login';
var mockServer = function (url, data) {
    var urlSegments = url.split('/');
    if (urlSegments[0] == "") {
        urlSegments = urlSegments.slice(1);
    }
    switch (urlSegments[0]) {
        case "login":
            return login(data);
        default:
            throw new Error("Invalid URL!");
    }
};
export default mockServer;
