import { State } from "./schema";
declare class Store {
    state: State;
    subscribers: Function[];
    readonly defaultState: State;
    constructor();
    initialize(initialState: any): void;
    getState(): State;
    subscribe(cb: any): void;
    unsubscribe(cb: any): void;
    updateSubscribers(): void;
    /**
     * This is the public API for changing state. Pass in a reducer that will accept the previous
     * state and return the new state.
     *
     * @param reducer
     * @param params
     */
    dispatch(reducer: any, ...params: any[]): void;
}
declare const store: Store;
export default store;
