// TODO: Consider adding support for subscribing to individual slices of state
import defaultState from '../defaultState';
var Store = /** @class */ (function () {
    function Store() {
        this.defaultState = defaultState;
        this.state = defaultState;
        this.subscribers = [];
    }
    Store.prototype.initialize = function (initialState) {
        this.state = initialState;
    };
    Store.prototype.getState = function () {
        return this.state;
    };
    Store.prototype.subscribe = function (cb) {
        // Make sure no duplicates
        this.unsubscribe(cb);
        this.subscribers.push(cb);
    };
    Store.prototype.unsubscribe = function (cb) {
        this.subscribers = this.subscribers.filter(function (sub) { return cb !== sub; });
    };
    Store.prototype.updateSubscribers = function () {
        var _this = this;
        this.subscribers.forEach(function (cb) {
            cb(_this.state);
        });
    };
    /**
     * This is the public API for changing state. Pass in a reducer that will accept the previous
     * state and return the new state.
     *
     * @param reducer
     * @param params
     */
    Store.prototype.dispatch = function (reducer) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.state = reducer.apply(void 0, [this.state].concat(params));
        this.updateSubscribers();
    };
    return Store;
}());
var store = new Store();
export default store;
