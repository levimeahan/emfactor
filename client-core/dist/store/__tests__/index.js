import store from '../../../../client-web/src/index';
it('does not allow state mutation', function () {
    var state = store.getState();
    state.x = 4;
});
