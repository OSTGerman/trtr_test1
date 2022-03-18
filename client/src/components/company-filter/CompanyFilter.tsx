import React, { useState } from 'react';
import { FilterRadio } from '../filter-radio/FilterRadio';
import './CompanyFilter.scss'


export function CompanyFilter({companies, onCompanySelected}: {companies: string[], onCompanySelected: (company: string) => void}) {
    const [checked, setChecked] = useState('');

    const companySelected = (company: string) => {
        setChecked(company);
        onCompanySelected(company);
    }

    return (
        <div className='transfer-filter-container'>
            <span className='transfer-filter-caption'>Компания</span>
            <FilterRadio label='Все' value={checked === ''} onClick={() => companySelected('')} />
            {
                companies.map(company => 
                    <FilterRadio label={company} value={checked === company} onClick={() => companySelected(company)} />)
            }            
        </div>
    );
}