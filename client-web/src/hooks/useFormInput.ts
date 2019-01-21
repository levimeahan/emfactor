import React, { useState } from 'react';

import { InputStateManager } from "../types";

export default function useFormInput(defaultValue: string): InputStateManager {
    const [value, setValue] = useState(defaultValue);

    return {
        value: value,
        onChange: (e: React.FormEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value)
        }
    };
}