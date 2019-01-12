import store from '../store';

export default function logout() {
    store.dispatch(logoutSuccess);
}

const logoutSuccess = (prevState) => ({
    ...prevState,
    app: { ...prevState.app, userEmployeeId: 0 }
});