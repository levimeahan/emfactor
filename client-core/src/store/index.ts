// TODO: Prevent state mutation
// TODO: Consider adding support for subscribing to individual slices of state

import { State } from "../types";
import defaultState from '../defaultState';

class Store {
    state: State;
    subscribers: Function[];
    readonly defaultState: State;

    constructor() {
        this.defaultState = defaultState;
        this.state = defaultState;
        this.subscribers = [];
    }

    initialize(initialState) {
        this.state = initialState;
    }

    getState() {
        return this.state;
    }

    subscribe(cb) {
        // Make sure no duplicates
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

export default store;