import React from 'react';
import { FilterCheckbox } from '../filter-checkbox/FilterCheckBox';
import './TransferFilter.scss'


export function TransferFilter() {  
    return (
        <div className='transfer-filter-container'>
            <span className='transfer-filter-caption'>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
            <FilterCheckbox label='Без пересадок' value={true} onChange={(a) => {/* TODO */}}/>
            <FilterCheckbox label='1 пересадка' value={true} onChange={(a) => {/* TODO */}}/>
            <FilterCheckbox label='2 пересадки' value={true} onChange={(a) => {/* TODO */}}/>
            <FilterCheckbox label='3 пересадки' value={true} onChange={(a) => {/* TODO */}}/>
        </div>
    );
}