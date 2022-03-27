import React, { useState } from 'react';
import { QualityFilterValues } from '../../models/QualityFilterValues';
import { QualityFilterButton } from '../quality-filter-button/QualityFilterButton';
import './QualityFilter.scss';

export function QualityFilter({ initialQuality, onFilterChanged }: { initialQuality: QualityFilterValues, onFilterChanged: (val: QualityFilterValues) => void }) {

    const [quality, setQuality] = useState<QualityFilterValues>(initialQuality);

    const onChange = (quality: QualityFilterValues) => {
        setQuality(quality);
        onFilterChanged(quality);
    }

    return (
        <div className='quality-filter-container'>            
            <QualityFilterButton label='Самый дешевый' isActive={quality==='CHEAPEST'} onClick={() => { onChange('CHEAPEST'); }}></QualityFilterButton>              
            <QualityFilterButton label='Самый быстрый' isActive={quality==='FASTEST'} onClick={() => { onChange('FASTEST'); }}></QualityFilterButton>              
            <QualityFilterButton label='Оптимальный' isActive={quality==='OPTIMAL'} onClick={() => { onChange('OPTIMAL'); }}></QualityFilterButton>              
        </div>
    );
}