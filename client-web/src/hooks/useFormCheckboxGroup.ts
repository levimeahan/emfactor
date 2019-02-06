import { useState } from 'react';

import { FormCheckboxGroupManager, InputCheckboxItem } from "../types";

export default function useFormCheckboxGroup(
    groupItems: InputCheckboxItem[], includeUncheckedValues: boolean = false
): FormCheckboxGroupManager {
    const [checked, setChecked] = useState(groupItems.map(item => item.checked));

    let allValues = groupItems.map(item => item.value);

    return {
        options: groupItems.map(
            (item, index) => ({ ...item, checked: checked[index] })
        ),
        value: includeUncheckedValues ? allValues : allValues.filter((val, id) => checked[id]),
        onChange: (index, newStatus) => {
            if(index < 0 || index >= checked.length) {
                throw new Error(`Invalid group checkbox index: ${index}!`);
            }

            let newChecked = [ ...checked ];
            newChecked[index] = newStatus;
            setChecked(newChecked);
        }
    };
}