import React, { useState } from 'react';
import { Company } from '../../models/Company';
import { FilterRadio } from '../filter-radio/FilterRadio';
import './CompanyFilter.scss'


export function CompanyFilter({companies, onCompanySelected}: {companies: Company[], onCompanySelected: (company: Company|null) => void}) {
    const [checked, setChecked] = useState<string|null>(null);

    const companySelected = (company: Company|null) => {
        setChecked(company && company.id);
        onCompanySelected(company);
    }

    return (
        <div className='company-filter-container'>
            <span className='company-filter-caption' >Компания</span>
            <FilterRadio label='Все' key="" value={checked === null} onClick={() => companySelected(null)} />
            {
                companies.map(company => 
                    <FilterRadio label={company.name} key={company.id} value={checked === company.id} onClick={() => companySelected(company)} />)
            }            
        </div>
    );
}