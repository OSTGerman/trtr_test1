import React from 'react';
import { FilterCheckbox } from '../filter-checkbox/FilterCheckBox'

export function TransferFilter() {  
    return (
        <div className='transfer-filter-container'>
            <span className='transfer-filter-caption'>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
            <FilterCheckbox label='Без пересадок' value={true} onChange={(a) => {alert(a);}}/>
        </div>
    );
}