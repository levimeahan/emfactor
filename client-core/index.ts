import store from './store';
import defaultState from './defaultState';
import * as actions from './actions/index';

store.initialize(defaultState);

export {
    store,
    actions
};
