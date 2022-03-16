import React, { useState } from 'react';

export function FilterCheckbox({ label, value, onChange }: { label: string, value: boolean, onChange: (checked: boolean) => void }) {
    const [checked, setChecked] = useState(value);
    return (
        <label>
            <input type="checkbox" checked={checked} onChange={(e) => {
                setChecked(!checked); onChange(!checked);
            }} />
            {label}
        </label>
    );
}