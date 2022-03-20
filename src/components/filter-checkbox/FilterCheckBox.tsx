import React, { useState } from 'react';
import './FilterCheckBox.scss';

export function FilterCheckbox({ label, value, onChange }: { label: string, value: boolean, onChange: (checked: boolean) => void }) {
    const [checked, setChecked] = useState(value);
    return (
        <label className='filter-checkbox-label'>
            {label}
            <input type="checkbox" className='filter-checkbox' checked={checked} onChange={(e) => {
                setChecked(!checked); onChange(!checked);
            }} />
            <span className='filter-checkbox-checkmark'></span>            
        </label>
    );
}