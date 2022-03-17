import React, { useState } from 'react';
import { FilterRadio } from '../filter-radio/FilterRadio';
import './CompanyFilter.scss'


export function CompanyFilter() {
    const [checked, setChecked] = useState(0);

    return (
        <div className='transfer-filter-container'>
            <span className='transfer-filter-caption'>Компания</span>
            <FilterRadio label='Все' value={checked === 0} onClick={() => setChecked(0)} />
            <FilterRadio label='S7 Airlines' value={checked === 1} onClick={() => setChecked(1)} />
            <FilterRadio label='XiamenAir' value={checked === 2} onClick={() => setChecked(2)} />            
        </div>
    );
}