import {fireEvent, waitForElement} from "react-testing-library";

const changeFormInput = async (input, newValue) => {
    fireEvent.change(input, {
        target: {
            value: newValue
        }
    });

    return waitForElement(() => input);
};

export default changeFormInput;