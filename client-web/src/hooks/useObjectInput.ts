import { useState } from 'react';

import { ObjectInputStateManager, InputItem } from "../types";

export default function useObjectInput(objectItems: InputItem[]): ObjectInputStateManager {
    const nameKeys = new Map();
    const defaultValue = {};
    const options: InputItem[] = [];

    objectItems.forEach((item, i) => {
        nameKeys.set(item.name, i);
        defaultValue[item.name] = item.value;
        options.push({
            name: item.name,
            label: item.label,
            value: item.value,
        });
    });

    const [value, setValue] = useState(defaultValue);

    return {
        options: options,
        value: value,
        onChange: (name, newValue) => {
            if(nameKeys.get(name) === undefined) {
                throw new Error(`Invalid object input item name: ${name}`);
            }

            setValue({
                ...value,
                [nameKeys.get(name)]: newValue
            })
        }
    };
}