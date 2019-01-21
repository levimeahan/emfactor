import { Reducer } from "../types";

const changeErrorMessage: Reducer = (prevState, errorMessage) => ({
    ...prevState,
    app: {
        ...prevState.app, errorMessage: errorMessage
    }
});

export default changeErrorMessage;