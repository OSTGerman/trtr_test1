import React, { useState } from 'react';
import './FilterRadio.scss';

export function FilterRadio({ label, value, onClick }: { label: string, value: boolean, onClick: () => void }) {
    
    return (
        <label className='filter-radio-label'>
            {label}
            <input type="checkbox" className='filter-radio' checked={value} onChange={(e) => {
                onClick();
            }} />
            <span className='filter-radio-checkmark'></span>            
        </label>
    );
}