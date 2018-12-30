import React, { useState } from 'react';

export default function useFormInput(defaultValue: string) {
    const [value, setValue] = useState(defaultValue);

    return {
        value: value,
        onChange: (e: React.FormEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value)
        }
    };
}