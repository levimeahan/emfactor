// TODO: Prevent state mutation
// TODO: Add support for subscribing to individual slices of state
// TODO: Add support for reducers only receiving/returning individual slices of state

class Store {
    constructor() {
        this.state = {};
        this.subscribers = [];
    }

    initialize(initialState) {
        this.state = initialState;
    }

    getState() {
        return this.state;
    }

    subscribe(cb) {
        // make sure no duplicates
        this.unsubscribe(cb);

        this.subscribers.push(cb);
    }

    unsubscribe(cb) {
        this.subscribers = this.subscribers.filter(sub => cb !== sub);
    }

    updateSubscribers() {
        this.subscribers.forEach((cb) => {
            cb(this.state);
        });
    }

    /**
     * This is the public API for changing state. Pass in a reducer that will accept the previous
     * state and return the new state.
     *
     * @param reducer
     * @param params
     */
    dispatch(reducer, ...params) {
        this.state = reducer(this.state, ...params);
        this.updateSubscribers();
    }
}

const store = new Store();

if(window) {
    window.store = store;
}

export default store;