import store from '../index';

it('does not allow state mutation', () => {
    let state = store.getState();

    state.x = 4;
});