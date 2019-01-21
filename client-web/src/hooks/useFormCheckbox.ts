import React, { useState } from 'react';

import { InputStateManager } from "../types";

export default function useFormCheckbox(defaultValue: boolean): InputStateManager {
    const [value, setValue] = useState(defaultValue);

    return {
        value: value,
        onChange: (e: React.FormEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.checked)
        }
    };
}