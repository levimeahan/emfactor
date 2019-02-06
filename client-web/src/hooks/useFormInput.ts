import React, { useState } from 'react';

import { InputStateManager } from "../types";

export default function useFormInput(defaultValue: InputStateManager["value"]): InputStateManager {
    const [value, setValue] = useState(defaultValue);

    return {
        value: value,
        onChange: (newValue) => {
            setValue(newValue)
        }
    };
}