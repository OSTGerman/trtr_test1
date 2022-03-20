import React, { useState } from 'react';
import { Company } from '../../models/Company';
import { FilterRadio } from '../filter-radio/FilterRadio';
import './CompanyFilter.scss'


export function CompanyFilter({companies, onCompanySelected}: {companies: Company[], onCompanySelected: (companyId: string|null) => void}) {
    const [checked, setChecked] = useState<string|null>(null);

    const companySelected = (companyId: string|null) => {
        setChecked(companyId);
        onCompanySelected(companyId);
    }

    return (
        <div className='company-filter-container'>
            <span className='company-filter-caption' >Компания</span>
            <FilterRadio label='Все' key="" value={checked === null} onClick={() => companySelected(null)} />
            {
                companies.map(company => 
                    <FilterRadio label={company.name} key={company.id} value={checked === company.id} onClick={() => companySelected(company.id)} />)
            }            
        </div>
    );
}