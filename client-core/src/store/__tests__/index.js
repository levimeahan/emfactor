import store from '../../../../client-web/src/index';

it('does not allow state mutation', () => {
    let state = store.getState();

    state.x = 4;
});